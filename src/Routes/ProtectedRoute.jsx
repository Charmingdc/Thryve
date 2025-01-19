import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user, isEmailVerified } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    } else if (!isEmailVerified) {
      navigate('/email-checkpoint');
    }
  }, [user, isEmailVerified, navigate]);


  return user && isEmailVerified ? children : null;
};

export default ProtectedRoute;