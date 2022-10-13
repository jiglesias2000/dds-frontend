import "./App.css";

import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate ,
} from "react-router-dom";
import axios from "axios";

import Loading from "./components/Loading";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { ArticulosFamilias } from "./components/articulosfamilias/ArticulosFamilias";
import { Articulos } from "./components/articulos/Articulos";
import {Test} from './components/Test';


function App() {
  const [isLoading, setIsLoading] = useState(false);

  

  // Add a request interceptor
  axios.interceptors.request.use(
    (config) => {
      setIsLoading(true);
      const token = 'Si tiene token' //localStorageService.getAccessToken()
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
      console.log("error en axios response", error);
      setIsLoading(false);
      alert("ocurrio un error\n" + error);
      return Promise.reject(error);
    }
  );

  return (
    <>
      <BrowserRouter>
        {/* <Test/> */}
        <Nav />
        <div className="divBody">
          
          {isLoading && <Loading />}
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route
              path="/articulosfamilias"
              element={<ArticulosFamilias/>}
            />
            <Route path="/articulos" element={<Articulos/>} />
            <Route path="*" element={<Navigate to="/" replace />}/>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
