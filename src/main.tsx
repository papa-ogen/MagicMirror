import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "../node_modules/@papa-ogen/craven-ui/dist/style.css";
import AuthProvider from "./components/AuthContext";
console.log(import.meta.env.VITE_SOME_KEY);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
