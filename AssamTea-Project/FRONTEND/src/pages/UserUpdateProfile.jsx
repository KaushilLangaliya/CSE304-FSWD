// src/pages/UserUpdateProfile.jsx
import React, { useContext, useState } from 'react';
import '../components/UserUpdateProfile.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserUpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    password: ''
  });

  const { setUser } = useContext(AuthContext); // ✅ Set user globally

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Only update the name globally
    setUser({ name: formData.fullName });

    alert("Profile updated successfully!");
    navigate('/UserProfile');
  };

  return (
    <div className="update-profile">
      <h2>Update User Profile</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />

        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />

        <label>New Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password" required />

        <button type="submit" className="update-btn">Update Profile</button>
      </form>
    </div>
  );
};

export default UserUpdateProfile;