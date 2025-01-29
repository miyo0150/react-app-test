import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DashboardLayoutBasic from "./components/layout"; // Your dashboard component
import SignIn from "./components/signIn"; // Sign-In page component

function App() {
  // ✅ State to track authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check localStorage for user authentication on load
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user); // Convert to boolean
  }, []);

  // ✅ Logout function to clear session
  const handleLogout = () => {
    console.log("🔴 Logging out...");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* ✅ Default Route: Sign-In */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <SignIn onSignIn={() => setIsAuthenticated(true)} />
            )
          }
        />

        {/* ✅ Dashboard Route (Protected) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardLayoutBasic onLogout={handleLogout} /> // ✅ Pass logout function
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;