import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SpinnerLoading } from '../Utils/SpinnerLoading';

export const ProtectedRoute: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState || authState.isPending) return;

    if (!authState.isAuthenticated) {
      const relativeUri = location.pathname + location.search;
      oktaAuth.setOriginalUri(relativeUri); // ✅ Store original URI
      navigate('/login');                   // ✅ Then redirect to LoginWidget
    }
  }, [authState, oktaAuth, location, navigate]);

  if (!authState || authState.isPending) {
    return <SpinnerLoading />;
  }

  if (!authState.isAuthenticated) {
    return null;
  }

  return <Outlet />;
};
