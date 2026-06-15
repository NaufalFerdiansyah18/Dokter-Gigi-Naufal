import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

// Import test helpers untuk development (akses via console)
if (import.meta.env.DEV) {
  import("./services/testNotifications.js");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
          <App />
    </BrowserRouter>
  </React.StrictMode>
);
