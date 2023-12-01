import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function ProtectedRoute({ path, ...rest }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return currentUser ? <Route path={path} {...rest} /> : (navigate('/login'), null);
}

export default ProtectedRoute;