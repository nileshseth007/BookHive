import React from "react";
import { Navigate, replace, useNavigate } from "react-router";
import { useOktaAuth } from "@okta/okta-react";
import OktaSignInWidget from "./OktaSignInWidget";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";

interface LoginWidgetProps {
  config: any; // Adjust the type if you have a specific shape for your config object
}

const LoginWidget: React.FC<LoginWidgetProps> = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();

  const onSuccess = (tokens: any): void => {
    oktaAuth.handleLoginRedirect(tokens);
  };
  // const onSuccess = async (tokens: any) => {
  //   if (tokens) {
  //     await oktaAuth.handleLoginRedirect(tokens); // ✅ This triggers restoreOriginalUri
  //   }
  // }
  // const onSuccess = async (tokens: any) => {
  //   if (tokens) {
  //     // Save tokens manually to tokenManager
  //     oktaAuth.tokenManager.setTokens(tokens);
  
  //     // Force authState to update
  //     await oktaAuth.authStateManager.updateAuthState();
  
  //     // Get the original URI (e.g., /shelf) set in ProtectedRoute
  //     const originalUri = oktaAuth.getOriginalUri();
  
  //     // Clean it up (prevent loops)
  //     oktaAuth.removeOriginalUri();
  
  //     // Navigate to it
  //     navigate(originalUri || '/', {replace : true} );
  //   }
  // };
  

  const onError = (err: any): void => {
    console.error("error logging in", err);
  };

  if (!authState) {
    return <SpinnerLoading />;
  }

  return authState.isAuthenticated ? (
    <Navigate to={{ pathname: "/" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LoginWidget;
