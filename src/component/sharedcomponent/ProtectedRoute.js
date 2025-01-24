import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roles, element }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');


  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
