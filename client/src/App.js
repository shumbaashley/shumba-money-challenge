import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./pages/sign-in";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import PrivateRoutes from "./utils/PrivateRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" exact element={<DashboardLayout />}></Route>
          <Route path="/dashboard" element={<DashboardLayout />}></Route>
        </Route>
        <Route path="/login" element={<SignInSide />}></Route>
      </Routes>
    </Router>
  );
}
