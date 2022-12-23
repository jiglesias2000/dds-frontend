import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthService from "../services/auth.service";

function Menu() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );

  useEffect(() => {
    AuthService.config(setUsuarioLogueado);
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand">
          <i className="fa fa-industry"></i>
          &nbsp;<i>Pymes</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/articulosfamilias">
                Articulos Familias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/articulos">
                Articulos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/articulosjwt">
                Articulos JWT
              </NavLink>
            </li>

            <li className="nav-item dropdown bg-dark">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Informes
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Ventas
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Compras
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Libro de IVA
                  </a>
                </li>
              </ul>
            </li>
          </ul>

            <ul className="navbar-nav ms-auto">
              {usuarioLogueado && (
                <li className="nav-item">
                  <a className="nav-link">Bienvenido: {usuarioLogueado}</a>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <span
                    className={
                      usuarioLogueado ? "text-warning" : "text-success"
                    }
                  >
                    <i
                      className={
                        usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"
                      }
                    ></i>
                  </span>
                  {usuarioLogueado ? " Logout" : " Login"}
                </NavLink>
              </li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
