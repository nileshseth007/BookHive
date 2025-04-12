import React, { useEffect, useRef } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import "../../node_modules/@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { oktaConfig } from "../lib/oktaConfig";

interface OktaSignInWidgetProps {
  config: any;
  onSuccess: (tokens: any) => void;
  onError: (error: any) => void;
}

const OktaSignInWidget: React.FC<OktaSignInWidgetProps> = ({ onSuccess, onError }) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the widget container has been rendered
    if (!widgetRef.current) {
      return;
    }
    const widget = new OktaSignIn(oktaConfig);
    widget
      .showSignInToGetTokens({
        // Use a CSS selector string
        el: "#okta-widget-container",
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [onSuccess, onError]);

  return (
    <div className="container mt-5 mb-5">
      {/* Add an id that matches the selector above */}
      <div id="okta-widget-container" ref={widgetRef} />
    </div>
  );
};

export default OktaSignInWidget;
