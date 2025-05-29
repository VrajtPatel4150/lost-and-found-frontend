// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, selectedRole } = useAuth();
  const location = useLocation();

  // 🚫 Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ⚠️ No role selected before login
  if (!selectedRole && role) {
    return <Navigate to="/role-select" replace />;
  }

  return children;
};

export default ProtectedRoute;
