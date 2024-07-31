import React from "react";
import { Navigate } from "react-router-dom";

const AuthLayout = ({
  children,
  authrequired = false,
  adminallowed = false,
  userallowed = false,
}) => {
  const userId = localStorage.getItem("userid");
  const isAdmin = localStorage.getItem("admin") === "true";

  if (authrequired && !userId) {
    // Redirect to login if authentication is required and the user is not logged in
    return <Navigate to="/login" />;
  }

  if (adminallowed && !isAdmin) {
    // Redirect to user dashboard if only admin is allowed but the user is not an admin
    return <Navigate to="/user-dashboard" />;
  }

  if (userallowed && isAdmin) {
    // Redirect to admin dashboard if only user is allowed but the user is an admin
    return <Navigate to="/admin-dashboard" />;
  }

  // Render the children components if all conditions are satisfied
  return <>{children}</>;
};

export default AuthLayout;
