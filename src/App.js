import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import DashboardLayoutBasic from "./components/layout"; // Your dashboard component


function App() {
  return (
    <Router>
      <DashboardLayoutBasic />
    </Router>
  );
}

export default App;