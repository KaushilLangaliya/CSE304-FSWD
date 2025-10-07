import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaCheckCircle, FaTruck, FaThermometerHalf } from 'react-icons/fa';
import './ProductDetail.css';
import axios from 'axios';

const ProductInfoSection = ({ product }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");

  // Automatically select the first available size (if present)
useEffect(() => {
  if (product?.availableSizes?.length > 0 && !selectedSize) {
    setSelectedSize(product.availableSizes[0].label);
    console.log("Default size set to:", product.availableSizes[0].label);
  }
}, [product]);



  const handleBulkOrderClick = () => {
    navigate('/order');
  };
const handleAddToCartClick = async () => {
  try {
    // ✅ Check if product exists
    if (!product || !product._id) {
      alert("Product data is not loaded yet. Please try again.");
      return;
    }

    // ✅ Validate size selection
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    // ✅ Log final payload before sending
    const payload = {
      productId: product._id,
      size: selectedSize,
      quantity: 1,
    };

    console.log("Submitting to backend:", payload);
    console.log("Final product in ProductInfoSection:", product);

    // ✅ Send POST request
    const res = await axios.post(
      'http://localhost:5000/api/cart/add',
      payload,
      {
        withCredentials: true
      }
    );

    console.log("Product added to cart:", res.data);
    navigate('/shoppingcart');
    
  } catch (error) {
    console.error("Failed to add product to cart", error.response?.data || error.message);

    // ✅ Show user-friendly error message
    if (error.response?.status === 400) {
      alert("Failed to add to cart. Required data is missing.");
    } else {
      alert("Please login to add product to cart.");
    }
  }
};


  return (
    <div className="product-info-section">
      <h1>{product.name}</h1>
      <div className="rating">
        {[...Array(5)].map((_, i) => <FaStar key={i} className="star" />)}
        <span>(133)</span>
      </div>
      <p className="price">{product.price}</p>
      <p className="description">{product.description}</p>

      <h3>Available Sizes and Packaging</h3>
      <div className="sizes">
        {product.availableSizes && product.availableSizes.map((sizeObj) => (
          <button
            key={sizeObj.label}
            className={selectedSize === sizeObj.label ? "size-option selected" : "size-option"}
            onClick={() => setSelectedSize(sizeObj.label)}
          >
            {sizeObj.label} — ₹ {sizeObj.price}
          </button>
        ))}
      </div>

      <h3>Shelf Life</h3>
      <p>{product.productLife || '18 Months'}</p>

      <h3>Brewing Instructions</h3>
      <p>{product.instuctions || 'Steep one teaspoon of tea in boiling water for 3 - 5 minutes'}</p>

      <h3>Additional Info</h3>
      <p><FaCheckCircle /> Certified Organic</p>
      <p><FaTruck /> Free shipping on orders over ₹ 5000</p>

      <h3>Temperature</h3>
      <p><FaThermometerHalf /> {product.temperature || '95 - 100 °C'}</p>

      <div className="action-buttons">
        <button className="add-to-cart" onClick={handleAddToCartClick}>
          ADD TO CART
        </button>
        <button className="bulk-order" onClick={handleBulkOrderClick}>
          Contact for Bulk Order
        </button>
      </div>
    </div>
  );
};

export default ProductInfoSection;
