// importing react modules.
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Context from "./Context.js";

// importing components
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Context>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
