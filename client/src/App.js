import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./pages/sign-in";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<SignInSide />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </Router>
  );
}
