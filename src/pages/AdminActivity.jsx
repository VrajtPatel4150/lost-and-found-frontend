// src/pages/AdminActivity.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminActivity = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user?.role !== "faculty") {
      navigate("/");
    } else {
      fetchAllItems();
    }
  }, [user]);

  const fetchAllItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching item history", err);
    }
  };

  const approveItem = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/items/approve/${id}`);
      fetchAllItems();
    } catch (err) {
      alert("Approval failed");
    }
  };

  const rejectItem = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/items/reject/${id}`);
      fetchAllItems();
    } catch (err) {
      alert("Rejection failed");
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "submitted": return "secondary";
      case "under_review": return "warning";
      case "approved": return "success";
      case "claimed": return "info";
      case "rejected": return "danger";
      default: return "dark";
    }
  };

  const pending = items.filter(item => !item.approved);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Faculty Activity Dashboard</h2>

      <h4 className="mt-5">Pending Approval</h4>
      {pending.length === 0 ? (
        <p>No pending items.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <span className={`badge bg-${getBadgeColor(item.status)}`}>
                    {item.status.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td>
                  <button className="btn btn-success btn-sm" onClick={() => approveItem(item._id)}>
                    Approve
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => rejectItem(item._id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4 className="mt-5">All Item Activity</h4>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Item Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Category</th>
              <th>Location</th>
              <th>Submitted By</th>
              <th>Claimed By</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>
                  <span className={`badge bg-${getBadgeColor(item.status)}`}>
                    {item.status.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td>{item.category}</td>
                <td>{item.location}</td>
                <td>{item.ownerEmail}</td>
                <td>{item.claimedBy || "—"}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminActivity;