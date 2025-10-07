import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
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
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashBoard';
import AdminShopPage from './pages/AdminShopPage';
import ResetPassword from './pages/ResetPassword';
import ShoppingCart from './pages/ShoppingCart';
import WholesalersAdmin from './pages/WholesalersAdmin';
import UserNavbar from './components/UserNavbar';
import PaymentPage from './pages/PaymentPage'; // adjust if in pages folder
import ManageProduct from './components/ManageProduct';
// import ManageProduct from './pages/ManageProduct';
import CartPage from './pages/CartPage';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import UserOrders from './pages/UserOrders';
import UserUpdateProfile from './pages/UserUpdateProfile';

// import ProductPage from './pages/Product';


  function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    // Listen to changes across the app
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
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/order" element={<Order />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/admin/shop" element={<AdminShopPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<AdminDashboard />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admin/wholesalers" element={<WholesalersAdmin />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin/manage-product" element={<ManageProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/user/UserOrders" element={<UserOrders />} />
          <Route path="/user/UserUpdateProfile" element={<UserUpdateProfile />} />

{/*           <Route path="/products" element={<ProductPage />} />
{/*           <Route path="/admin/manage-products" element={<ManageProduct />} /> */}
      </Routes> */}
      <Footer />
    </Router>
  );
}

export default App;

