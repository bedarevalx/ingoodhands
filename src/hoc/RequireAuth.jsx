import axios from '../axios';
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AppContext } from '../App';
function RequireAuth({ children }) {
  const { isLoggined, setIsLoggined } = React.useContext(AppContext);
  const location = useLocation();
  // const { user, signIn } = useAuth();
  console.log('Loggined?:', isLoggined);
  if (!isLoggined) {
    return <Navigate to={'/auth'} state={{ from: location }} />;
  }
  return children;
}

export default RequireAuth;
