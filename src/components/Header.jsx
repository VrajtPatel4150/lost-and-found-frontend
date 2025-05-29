// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/LOGO.jpg"
            alt="Logo"
            height="40"
            className="me-2"
            style={{ borderRadius: "5px" }}
          />
          <span className="fw-bold">Lost & Found Platform</span>
        </Link>

        {user && (
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link to="/lost-items" className="nav-link">Lost Items</Link>
              </li>
              <li className="nav-item">
                <Link to="/found-items" className="nav-link">Found Items</Link>
              </li>
              <li className="nav-item">
                <Link to="/claimed-items" className="nav-link">Claimed Items</Link>
              </li>
              <li className="nav-item">
                <Link to="/report" className="nav-link">Report Item</Link>
              </li>
            
              
              {user?.role === "faculty" && (
                <>
                  <li className="nav-item">
                    <Link to="/admin-activity" className="nav-link">Faculty Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage-users" className="nav-link">Manage Users</Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-light ms-3">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
