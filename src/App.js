import React, { useMemo } from "react";
import { useHistory } from "react-router";
import { Security } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import { oktaAuthConfig } from "./config/okta";
import Routes from "./Routes";

const App = () => {
  const history = useHistory();

  const oktaAuth = useMemo(() => new OktaAuth(oktaAuthConfig), []);

  const onAuthRequired = () => history.push("/login");

  const restoreOriginalUri = async () => history.replace("/home");

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={onAuthRequired}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Routes />
    </Security>
  );
};

export default App;
