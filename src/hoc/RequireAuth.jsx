import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  // const { user, signIn } = useAuth();
  console.log('Loggined?:', user);
  if (!user) {
    return <Navigate to={'/auth'} state={{ from: location }} />;
  }
  return children;
}

export default RequireAuth;
