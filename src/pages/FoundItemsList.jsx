// src/pages/FoundItemsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const FoundItemsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      const data = Array.isArray(res.data)
        ? res.data.filter((item) => item.type === "found" && item.approved)
        : [];
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch found items", err);
      setItems([]);
    }
  };

  const handleClaim = async (item) => {
    const claimerEmail = prompt("Enter your email to claim this item:");
    if (!claimerEmail) return;

    try {
      await axios.post("http://localhost:5000/api/claims", {
        itemName: item.name,
        ownerEmail: item.ownerEmail,
        claimerEmail,
      });

      await axios.put(`http://localhost:5000/api/items/${item._id}`, {
        status: "claimed",
        approved: true,
        claimedBy: claimerEmail,
      });

      alert("Item claimed successfully! You can now view it in the Claimed Items list.");
      fetchItems();
    } catch (err) {
      console.error("Claim failed", err);
      alert("Failed to claim item.");
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`);
      fetchItems();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete item.");
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

  const categories = ["all", ...new Set(items.map((item) => item.category).filter(Boolean))];
  const locations = ["all", ...new Set(items.map((item) => item.location).filter(Boolean))];

  let filtered = items
    .filter((item) => item.status !== "claimed")
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
    .filter((item) => selectedLocation === "all" || item.location === selectedLocation);

  if (sortOption === "newest") {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOption === "oldest") {
    filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortOption === "az") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>{loc === "all" ? "All Locations" : loc}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A → Z</option>
          </select>
        </div>
      </div>

      <div className="row">
        {paginated.length > 0 ? (
          paginated.map((item) => (
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
                  <p><strong>Approval:</strong> {item.approved ? "Approved" : "Pending"}</p>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={() => handleClaim(item)}>Claim</button>
                    {user?.role === "faculty" && (
                      <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5"><p>No found items available.</p></div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`btn btn-sm mx-1 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsList;