import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from "./pages/sign-in";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import PrivateRoutes from "./utils/PrivateRoutes";
import RecipientsTable from "./pages/dashboard/RecipientsTable";
import RecipientForm from "./pages/dashboard/RecipientForm";
import NotFoundPage from "./pages/not-found";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="recipients" exact element={<DashboardLayout />}>
            <Route path="new" element={<RecipientForm />} />
            <Route path=":id" element={<RecipientForm />} />
            <Route path="" element={<RecipientsTable />} />
          </Route>
        </Route>
        <Route path="/login" element={<SignInSide />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
}
