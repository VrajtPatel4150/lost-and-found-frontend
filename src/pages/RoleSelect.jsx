// src/pages/RoleSelect.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleSelect = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuth();

  const handleSelect = (role) => {
    setSelectedRole(role); // Save role in context
    navigate("/login");    // Go to login page
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center shadow p-5 bg-white rounded">
        <h2 className="mb-4">Welcome to Lost & Found Platform</h2>
        <p className="mb-4">Please select your role to continue:</p>
        <div className="d-grid gap-3 col-8 mx-auto">
          <button
            className="btn btn-primary"
            onClick={() => handleSelect("student")}
          >
            Student Login
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSelect("faculty")}
          >
            Faculty Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
