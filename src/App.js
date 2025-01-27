import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import DashboardLayoutBasic from './components/layout'; // Your existing dashboard component
import SignIn from './components/signIn'; // Sign-In page component

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Default Route: Sign-In */}
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

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardLayoutBasic />
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
