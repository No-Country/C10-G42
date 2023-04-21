import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const isAuthenticated = auth.user;
  const userRole = auth.user?.role;
  if (!(isAuthenticated && userRole === 'patient')) {
    return <Navigate to='/login' />;
  }
  return children;
};
export default ProtectedRoute;
