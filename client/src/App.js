import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
          <Route
            path="/"
            exact
            element={<Navigate to="/recipients" replace />}
          />
          <Route path="recipients" exact element={<DashboardLayout />}>
            <Route path="new" element={<RecipientForm title="Add New Recipient" />} />
            <Route
              path=":recipientId/edit"
              element={<RecipientForm title="Edit Recipient" />}
            />
            <Route path="" element={<RecipientsTable />} />
          </Route>
        </Route>
        <Route path="/login" element={<SignInSide />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
}
