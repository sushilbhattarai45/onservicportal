// importing react modules.
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// importing components
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
