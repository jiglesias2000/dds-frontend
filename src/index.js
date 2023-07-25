import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'


//@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");

// no funciona en stackblitz
import '@fortawesome/fontawesome-free/css/all.min.css'
import "./index.css";
import App from "./App";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   // <React.StrictMode>
      <App />
   // </React.StrictMode>
);
