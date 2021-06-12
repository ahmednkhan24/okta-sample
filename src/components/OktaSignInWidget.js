import React, { useEffect, useRef, useMemo } from "react";
import { useOktaAuth } from "@okta/okta-react";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { widgetConfig } from "../config/okta";

const OktaSignInWidget = () => {
  const {
    oktaAuth,
    authState: { isAuthenticated },
  } = useOktaAuth();

  const widget = useMemo(() => new OktaSignIn(widgetConfig), []);
  const widgetRef = useRef(widget);

  useEffect(() => {
    if (!isAuthenticated) {
      widget
        .showSignInToGetTokens({
          el: widgetRef.current,
          scopes: widgetConfig.authParams.scopes,
        })
        .then((tokens) => {
          oktaAuth.handleLoginRedirect(tokens);
        })
        .catch((err) => {
          console.log("widget error: ", err);
          throw err;
        });
    }

    return () => widget.remove();
  }, [oktaAuth, isAuthenticated, widget]);

  return <div ref={widgetRef} />;
};
export default OktaSignInWidget;
