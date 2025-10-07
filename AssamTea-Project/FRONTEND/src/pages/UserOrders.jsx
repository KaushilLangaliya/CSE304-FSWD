// src/pages/UserOrders.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../components/UserOrders.css';

const UserOrders = () => {
  const { userOrders, setUserOrders } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (userOrders.length === 0) {
      const stored = localStorage.getItem('userOrders');
      if (stored) setOrders(JSON.parse(stored));
    } else {
      setOrders(userOrders);
    }
  }, [userOrders]);

  const handleToggle = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  const handleRemove = (indexToRemove) => {
    const updatedOrders = orders.filter((_, index) => index !== indexToRemove);
    setOrders(updatedOrders);
    setUserOrders(updatedOrders);
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="user-orders-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-header">
                <h2 className="order-name">{order.name}</h2>
                <div className="button-group">
                  <button className="readmore-btn" onClick={() => handleToggle(index)}>
                    {expandedOrder === index ? 'Hide Details' : 'Read More'}
                  </button>
                  <button className="remove-btn" onClick={() => handleRemove(index)}>
                    Remove
                  </button>
                </div>
              </div>
              {expandedOrder === index && (
                <div className="order-details show">
                  <img src={order.image} alt={order.name} className="order-image" />
                  <p>Quantity: {order.quantity}</p>
                  <p>Weight: {order.weight}</p>
                  <p>Price: ₹{order.price}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;