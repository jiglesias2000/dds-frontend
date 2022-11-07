import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import Loading from "./components/Loading";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { ArticulosFamilias } from "./components/articulosfamilias/ArticulosFamilias";
import { Articulos } from "./components/articulos/Articulos";
import { Test } from "./components/Test";


function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // agregar axios interceptor
    axios.interceptors.request.use(
      (config) => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error) => {
        console.log("error en axios request");
        Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        // loguear el error
        console.log("error en axios response1 ", error);

        setIsLoading(false);

        if (error.response.status === 401) {
          window.location.href = "/login";
        }
        
        error.message =  error?.response?.data?.message ?? "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
        return Promise.reject(error);

        //return error
        //throw new Error(error?.response?.data?.Message ?? 'Ocurrio un error');
      }
    );
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* <Test /> */}
        <Nav />
        <div className="divBody">
          {isLoading && <Loading />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articulosfamilias" element={<ArticulosFamilias />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

