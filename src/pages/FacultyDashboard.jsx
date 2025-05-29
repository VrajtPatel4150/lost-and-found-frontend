// src/pages/FacultyDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import LostItemsList from "./LostItemsList";
import FoundItemsList from "./FoundItemsList";
import AdminActivity from "./AdminActivity";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      {/* Section 1: Report Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Lost & Found Items</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/report")}
        >
          Report Lost/Found Item
        </button>
      </div>

      {/* Section 2: Lost Items */}
      <h4 className="mt-3">Lost Items</h4>
      <LostItemsList />

      {/* Section 3: Found Items */}
      <h4 className="mt-5">Found Items</h4>
      <FoundItemsList />

      {/* Section 4: Activity Logs */}
      <h4 className="mt-5">Faculty Activity Logs</h4>
      <AdminActivity />
   </div>
  );
};

export default FacultyDashboard;
