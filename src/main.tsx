import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import enviroment from "./enviroment.ts";
import { UserAuthProvider } from "./providers/UserAuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={enviroment.auth_domin}
      clientId={enviroment.auth_clinent_id}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: enviroment.api_identifier,
      }}
    >
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
