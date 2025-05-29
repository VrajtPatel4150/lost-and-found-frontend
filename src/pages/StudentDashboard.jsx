// src/pages/StudentDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import LostItemsList from "./LostItemsList";
import FoundItemsList from "./FoundItemsList";

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lost Items</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/report")}
        >
          Report Lost Item
        </button>

      </div>
      <LostItemsList />
      <h4 className="mt-5">Found Items</h4>
      <FoundItemsList />
    </div>
  );
};

export default StudentDashboard;
