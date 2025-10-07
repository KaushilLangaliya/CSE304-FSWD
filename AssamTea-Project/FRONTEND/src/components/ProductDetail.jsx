// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ProductImageSection from '../components/ProductImageSection';
// import ProductInfoSection from '../components/ProductInfoSection';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ProductDetail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const product = location.state?.product;

//   console.log('ProductDetail product:', product);

//   React.useEffect(() => {
//     if (!product) {
//       // Redirect to home or shop if no product data found
//       navigate('/products');
//     }
//   }, [product, navigate]);

//   if (!product) {
//     return null; // or loading spinner
//   }

//   return (
//     <div
//       className="product-detail-page"
//       style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: '40px' }}
//     >
//       <ProductImageSection product={product} />
//       <ProductInfoSection product={product} />
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductImageSection from '../components/ProductImageSection';
import ProductInfoSection from '../components/ProductInfoSection';

const ProductDetail = () => {
  const { id } = useParams(); // ⬅️ get productId from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`,{
          withCredentials: true,
        });
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product', err);
        navigate('/products'); // fallback if product not found
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div
      className="product-detail-page"
      style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: '40px' }}
    >
      <ProductImageSection product={product} />
      <ProductInfoSection product={product} />
    </div>
  );
};

export default ProductDetail;
