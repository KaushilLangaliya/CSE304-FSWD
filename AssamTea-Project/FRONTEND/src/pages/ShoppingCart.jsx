

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../components/ShoppingCart.css';
import ProductRow from '../components/ProductRow';
import OrderSummary from '../components/OrderSummary';
import axios from 'axios';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { userOrders, setUserOrders } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cart/getcart', {
          withCredentials: true,
        });

        const fetchedProducts = res.data.items.map(item => ({
          id: item.product._id,
          name: item.product.name,
          image: item.product.image,
          weight: item.size,
          price: item.product.price,
          quantity: item.quantity,
          description: item.product.description || '',
          benefits: item.product.benefits || '',
          stock: item.product.stockStatus || 'In stock',
        }));

        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (id, size) => {
    try {
      await axios.delete('http://localhost:5000/api/cart/remove', {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: { productId: id, size },
      });

      setProducts(prev => prev.filter(p => !(p.id === id && p.weight === size)));
    } catch (err) {
      console.error("Error deleting item from cart:", err);
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const handleProceedToBuy = async () => {
    try {
      const orderItems = products.map(item => ({
        product: item.id,
        size: item.weight,
        quantity: item.quantity,
      }));

      const res = await axios.post('http://localhost:5000/api/order/place', {
        items: orderItems
      }, {
        withCredentials: true
      });

      console.log('Order placed:', res.data);
      setProducts([]); // optional UI clear

      navigate('/payment', { state: { baseAmount: res.data.order.totalPrice } });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  const handleLocalPlaceOrder = () => {
    if (products.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const newOrders = [...userOrders, ...products];
    setUserOrders(newOrders);
    localStorage.setItem('userOrders', JSON.stringify(newOrders));
    alert('Order saved in your profile.');
  };

  return (
    <div className="shopping-cart-container">
      <h1 className="shopping-cart-title">Shopping Cart</h1>
      <div className="cart-content">
        <div className="product-list">
          <div className="product-header">
            <span>Product</span>
            <span></span>
            <span>Subtotal</span>
          </div>

          {products.length === 0 ? (
            <p style={{ marginTop: '20px', fontSize: '18px' }}>Your cart is empty.</p>
          ) : (
            <>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                  onQuantityChange={handleQuantityChange}
                />
              ))}

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button onClick={handleLocalPlaceOrder} className="checkout-button">
                  Save in Profile
                </button>
                <button onClick={handleProceedToBuy} className="checkout-button">
                  Proceed to Buy
                </button>
              </div>
            </>
          )}

          <a href="/product" className="continue-shopping">
            ← CONTINUE SHOPPING
          </a>
        </div>

        <OrderSummary products={products} onProceed={handleProceedToBuy} />

      </div>
    </div>
  );
};

export default ShoppingCart;
