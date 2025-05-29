// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    setSelectedRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, selectedRole, setSelectedRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // ✅ This must match exactly
