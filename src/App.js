import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DashboardLayoutBasic from "./components/layout"; // Your dashboard component
import SignIn from "./components/signIn"; // Sign-In page component
// import { Route, router } from "react-router-dom";

function App() {
  return (
    <Router>
      <DashboardLayoutBasic />
    </Router>
  );
}

export default App;