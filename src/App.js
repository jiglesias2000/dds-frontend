import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";


import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { ArticulosFamilias } from "./components/articulosfamilias/ArticulosFamilias";
import { Articulos } from "./components/articulos/Articulos";
import Login from "./components/login/Login";
import ErrorB from "./components/ErrorB";
import { Contador } from "./components/Contador";
import { ArticulosJWT } from "./components/articulosJWT/ArticulosJWT";
import RequireAuth from "./components/RequireAuth";
import httpService from "./services/http.service";

import ModalDialog from "./components/ModalDialog";

window.onerror = (msg, url, line, col, error) => {
  // Note that col & error are new to the HTML 5 spec and may not be
  // supported in every browser.  It worked for me in Chrome.
  var extra = !col ? "" : "\ncolumn: " + col;
  extra += !error ? "" : "\nerror: " + error;

  // You can view the information in an alert to see things working like this:
  //console.error("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
  console.log({ error: msg, errorInfo: { url, line, col, error } });

  var suppressErrorAlert = true;
  // If you return true, then error alerts (like in older versions of
  // Internet Explorer) will be suppressed.
  return suppressErrorAlert;
};

window.onunhandledrejection = (e) => {
  logError(e.reason, e);
};
const logError = (error, errorInfo) => {
  console.log({ error, errorInfo });
  // eviar al servidor este error para que lo loguee
};

function App() {
  

  return (
    <>
      {/* <ErrorBoundary FallbackComponent={ErrorB} onError={logError}> */}
        <BrowserRouter>

          {/* <Contador /> */}
          <ModalDialog/>

          
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route
                path="/articulosfamilias"
                element={<ArticulosFamilias />}
              />
              <Route path="/articulos" element={<Articulos />} />
              <Route
                path="/articulosjwt"
                element={
                  <RequireAuth>
                    <ArticulosJWT />
                  </RequireAuth>
                }
              />
              <Route
                path="/login"
                element={
                  <Login />
                }
              />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;
