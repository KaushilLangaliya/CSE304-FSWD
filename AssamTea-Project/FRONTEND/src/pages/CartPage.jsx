// src/pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderSummary from '../components/OrderSummary';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const res = await axios.get('/api/cart/getcart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log("Cart products:", products);

      
      const items = res.data.items.map(item => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size
      }));

      setProducts(items);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleProceedToBuy = () => {
    const totalAmount = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    navigate('/payment', { state: { totalAmount } });
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Your Cart</h2>
      <OrderSummary products={products} onProceed={handleProceedToBuy} />
    </div>
  );
};

export default CartPage;
