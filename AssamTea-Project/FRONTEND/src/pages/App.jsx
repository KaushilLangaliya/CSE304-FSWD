import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Order from './pages/Order';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ShoppingCart from './pages/ShoppingCart';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashBoard';
import Profile from './pages/Profile';
import AdminShopPage from './pages/AdminShopPage';
import WholesalersAdmin from './pages/WholesalersAdmin';




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./pages/Order";
import WholesalersAdmin from "./pages/WholesalersAdmin";


import ManageProduct from './pages/ManageProduct';
import ProductPage from './pages/Product'; // OR './pages/ShoppingCart' or 'ProductDisplay' if it's named differently



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  return (
    <Router>
      {isLoggedIn ? <UserNavbar /> : <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/ordernow" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* ✅ fixed: dynamic route */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/order" element={<Order />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/profile" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/shop" element={<AdminShopPage />} />
        <Route path="/admin/wholesalers" element={<WholesalersAdmin />} />  
        <Route path="/products" element={<ProductPage />} />
        <Route path="/admin/manage-products" element={<ManageProduct />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
