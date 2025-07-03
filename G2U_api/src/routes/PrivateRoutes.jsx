import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoutes;
