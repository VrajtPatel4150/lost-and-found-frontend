// src/pages/ClaimedItemsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ClaimedItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchClaimedItems();
  }, []);

  const fetchClaimedItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/items/claimed`);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching claimed items:", err);
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

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Claimed Items</h3>
      <div className="row">
        {items.map((item) => (
          <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
            <div className="card h-100 shadow-sm">
              {item.imageUrl && (
                <img src={item.imageUrl} className="card-img-top" alt={item.name} style={{ height: "200px", objectFit: "cover" }} />
              )}
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  {item.name}
                  <span className={`badge bg-${getBadgeColor(item.status)}`}>
                    {item.status.replace("_", " ").toUpperCase()}
                  </span>
                </h5>
                <p className="card-text">{item.description}</p>
                <p className="text-muted small"><strong>Category:</strong> {item.category}</p>
                <p className="text-muted small"><strong>Location:</strong> {item.location}</p>
                <p className="text-muted small"><strong>Claimed By:</strong> {item.claimedBy || "—"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimedItemsList;