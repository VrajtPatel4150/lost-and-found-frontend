import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import FacultyDashboard from "./pages/FacultyDashboard.jsx";
import ReportItem from "./pages/ReportItem.jsx";
import LostItemsList from "./pages/LostItemsList.jsx";
import FoundItemsList from "./pages/FoundItemsList.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PublicLostItemsList from "./pages/PublicLostItemsList.jsx";
import RoleSelect from "./pages/RoleSelect.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import ClaimedItemsList from "./pages/ClaimedItemsList.jsx";
import AdminActivity from "./pages/AdminActivity.jsx";
import "./assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-fill container py-4">
            <Routes>
              {/* 🔓 Public access */}
              <Route path="/" element={<PublicLostItemsList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/role-select" element={<RoleSelect />} />

              {/* 🔐 Protected for all logged in users */}
              <Route
                path="/report"
                element={
                  <ProtectedRoute>
                    <ReportItem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lost-items"
                element={
                  <ProtectedRoute>
                    <LostItemsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/found-items"
                element={
                  <ProtectedRoute>
                    <FoundItemsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/claimed-items"
                element={
                  <ProtectedRoute>
                    <ClaimedItemsList />
                  </ProtectedRoute>
                }
              />

              {/* 🔐 Role-based views */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute role="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faculty"
                element={
                  <ProtectedRoute role="faculty">
                    <FacultyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-users"
                element={
                  <ProtectedRoute role="faculty">
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />
                
           

              <Route path="/admin-activity" element={
                <ProtectedRoute role="faculty">
                 <AdminActivity />
                </ProtectedRoute>
              } />
              {/* ❌ Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
