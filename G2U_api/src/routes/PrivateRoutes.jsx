import React from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const PrivateRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoutes;
