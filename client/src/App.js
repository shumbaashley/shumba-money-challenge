import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./pages/sign-in";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import PrivateRoutes from "./utils/PrivateRoutes";
import RecipientsTable from "./pages/dashboard/RecipientsTable";
import RecipientForm from "./pages/dashboard/RecipientForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" exact element={<DashboardLayout />}>
          <Route path="/recipients/new" element={<RecipientForm />} />
          <Route path="/recipients/:id" element={<RecipientForm />} />
          <Route path="/recipients" element={<RecipientsTable />} />
          </Route>
        </Route>
        <Route path="/login" element={<SignInSide />}></Route>
      </Routes>
    </Router>
  );
}
