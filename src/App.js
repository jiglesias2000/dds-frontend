import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";

import Loading from "./components/Loading";
import Menu from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { ArticulosFamilias } from "./components/articulosfamilias/ArticulosFamilias";
import { Articulos } from "./components/articulos/Articulos";
import Login from "./components/Login";
import ErrorB  from "./components/ErrorB";
import { Test } from "./components/Test";

function App() {
  const [cntLoading, setCntLoading] = useState(0);

  const logError = (error, errorInfo) => {
    console.log({ error, errorInfo });
  };

  useEffect(() => {
    // agregar axios interceptor
    axios.interceptors.request.use(
      (request) => {
        setCntLoading((cnt) => cnt + 1);
        const token = localStorage.getItem("token");
        if (token) {
          request.headers["Authorization"] = "Bearer " + token;
        }
        return request;
      },
      (error) => {
        console.log("error en axios request", error);
        Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        setCntLoading((cnt) => cnt - 1);
        return response;
      },
      (error) => {
        // loguear el error
        console.log("error en axios response ", error);
        setCntLoading((cnt) => cnt - 1);

        if (error.response.status === 401) {
          window.location.href = "/login";
        }

        error.message =
          error?.response?.data?.message ??
          "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
        return Promise.reject(error);

        //return error
        //throw new Error(error?.response?.data?.Message ?? 'Ocurrio un error');
      }
    );
  }, []);

  return (
    <>
      {/* <Test /> */}
      <ErrorBoundary FallbackComponent={ErrorB} onError={logError}>
        <BrowserRouter>
          <Menu />
          <div className="divBody">
            {cntLoading > 0 && <Loading />}
            <Routes>
              <Route path="/Inicio" element={<Inicio />} />
              <Route
                path="/articulosfamilias"
                element={<ArticulosFamilias />}
              />
              <Route path="/articulos" element={<Articulos />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/Inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
