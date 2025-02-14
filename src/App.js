import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import DashboardLayoutBasic from './components/layout'; // Your existing dashboard component
import SignIn from './components/signIn'; // Sign-In page component

function App() {
  return (
    <DashboardLayoutBasic />
  );
}

export default App;
