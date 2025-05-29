// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig.js";
import axios from "axios";

const Login = () => {
  const { setUser, selectedRole } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = isSignup
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      const user = userCred.user;

      const response = await axios.post("http://localhost:5000/api/auth/firebase-auth", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        role: selectedRole,
      });

      setUser(response.data.user);
      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("email", user.email); // ✅ Store email for item reporting

      navigate(`/${selectedRole}`);
    } catch (err) {
      alert("Authentication failed. " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await axios.post("http://localhost:5000/api/auth/firebase-auth", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: selectedRole,
      });

      setUser(response.data.user);
      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("email", user.email); // ✅ Store email for item reporting

      navigate(`/${selectedRole}`);
    } catch (err) {
      alert("Google login failed. " + err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-5 shadow rounded w-100" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3 text-center">{isSignup ? "Sign Up" : "Log In"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>
        <button className="btn btn-outline-danger w-100 mt-3" onClick={handleGoogleLogin}>
          Continue with Google
        </button>
        <p className="mt-3 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
