import React from "react";
import {  Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.security.isAuthenticated);
  if (!(isAuthenticated && localStorage.getItem('token'))) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
export default ProtectedRoute;
