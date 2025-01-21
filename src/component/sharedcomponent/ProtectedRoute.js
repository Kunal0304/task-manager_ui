import React from 'react'
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({ role, element }) {

    const roleLocal = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (roleLocal === role && token) {
        return element;
    }
    else {
        return <Navigate to="/unauthorized" />;
    }
}
