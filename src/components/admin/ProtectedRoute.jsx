import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCms } from '../../context/CmsContext';

export default function ProtectedRoute({ children }) {
  const { auth } = useCms();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
