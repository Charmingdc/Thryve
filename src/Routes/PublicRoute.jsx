import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/home" /> : children;
};

export default PublicRoute;