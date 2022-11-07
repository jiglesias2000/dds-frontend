import React from "react";
import ReactDOM from "react-dom/client";

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "./index.css";
import App from "./App";

// alternativa en el index.html
{/* <link
rel="stylesheet"
href="https://use.fontawesome.com/releases/v6.2.0/css/all.css"
crossorigin="anonymous"
/> */}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
      <App />
  // </React.StrictMode>
);
