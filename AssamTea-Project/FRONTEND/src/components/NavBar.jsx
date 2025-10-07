
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import logo from '../assets/images/LOGO.png';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Assam Tea Logo" width="85" height="70" className="me-2" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/order">Order</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>

            {/* ✅ Admin-only Link */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin/manage-products">
                  Manage Products
                </Link>
              </li>
            )}
          </ul>

          <Link to="/ordernow" className="btn btn-warning me-3">
            ORDER NOW
          </Link>

          <div className="dropdown">
            <button
              className="btn btn-warning dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              id="userMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle size={20} /> {user ? "Profile" : "Account"}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
              {!user ? (
                <>
                  <li><Link className="dropdown-item" to="/login">Login</Link></li>
                  <li><Link className="dropdown-item" to="/signup">Signup</Link></li>
                </>
              ) : (
                <>
                  <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

