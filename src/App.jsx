import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/Components/Register";
import Login from "../pages/Components/Login";
import TicketForm from "../pages/Components/TicketForm";
import AdminDashboard from "../pages/Components/AdminDashboard";
import Landing from "../pages/Landing";
import UserDashboard from "../pages/Components/UserDashboard";
import AuthLayout from "../pages/Components/AuthLayout";
import Profile from "../pages/Components/Profile";
import AdminLogin from "../pages/Components/AdminLogin";
import TicketDetails from "../pages/Components/TicketDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <Landing />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/raise-ticket"
          element={
            <AuthLayout authrequired={true}>
              <TicketForm />
            </AuthLayout>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AuthLayout authrequired={true} adminallowed={true}>
              <AdminDashboard />
            </AuthLayout>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <AuthLayout authrequired={true} userallowed={true}>
              <UserDashboard />
            </AuthLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthLayout authrequired={true}>
              <Profile />
            </AuthLayout>
          }
        />
        <Route
          path="/admin-register"
          element={
            <AuthLayout>
              <AdminLogin />
            </AuthLayout>
          }
        />
        <Route
          path="/ticket-details/:id"
          element={
            <AuthLayout authrequired={true}>
              <TicketDetails />
            </AuthLayout>
          }
        />
        <Route
          path="*"
          element={
            <AuthLayout>
              <Landing />
            </AuthLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
