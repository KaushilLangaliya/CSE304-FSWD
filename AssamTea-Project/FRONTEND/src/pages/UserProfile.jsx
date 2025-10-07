import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../components/UserProfile.css';
import { FaShoppingCart, FaUserEdit } from 'react-icons/fa';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const userName = user?.name || "User"; // Default fallback

  const cards = [
    {
      title: 'Show Order',
      icon: <FaShoppingCart size={40} />,
      description: 'Track and manage your orders.',
      route: '/user/UserOrders'
    },
    {
      title: 'Update Profile',
      icon: <FaUserEdit size={40} />,
      description: 'Update your personal details.',
      route: '/user/UserUpdateProfile'
    }
  ];

  return (
    <div className="user-dashboard">
      <h1 className="dashboard-title">User Profile</h1>
      <p className="user-welcome">Welcome, <strong>{userName}</strong> !</p>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div className="dashboard-card" key={index} onClick={() => navigate(card.route)}>
            <div className="card-icon">{card.icon}</div>
            <h2 className="card-title">{card.title}</h2>
            <p className="card-desc">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
