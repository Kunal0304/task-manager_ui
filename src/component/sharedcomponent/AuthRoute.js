import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Assuming user data is stored in localStorage

  if (token) {
    return <Navigate to="/task" replace />; // Redirect to the main page (e.g., /task) if the user is logged in
  }

  return element;
};

export default AuthRoute;
