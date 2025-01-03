import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientID } from "./api/apiConfig.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <GoogleOAuthProvider clientId={googleClientID}> */}
        <App />
      {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
  </StrictMode>
);
