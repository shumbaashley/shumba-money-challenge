import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./pages/sign-in";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}></Route>
        <Route path="/login" element={<SignInSide />}></Route>
        <Route path="/" element={<DashboardLayout />}></Route>
        
      </Routes>
    </Router>
  );
}
