import React, { useState, useEffect } from "react";
import "./Login.css"; //css global
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleIngresar = async () => {
    AuthService.login(usuario, clave, navigate);
  };

  useEffect(() => {
    // lo primero que hacemos al ingresar al login es desloguearnos
    // borrando los datos de sessionStorage y el state usuarioLogueado
    AuthService.logout();
  });

  return (
    <>
      <div className="login wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <i className="fa-regular fa-user"></i>
          </div>

          <input
            type="text"
            id="usuario"
            className="fadeIn second"
            name="usuario"
            autoComplete="off"
            placeholder="usuario"
            onChange={(e) => setUsuario(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            id="clave"
            className="fadeIn third"
            name="clave"
            autoComplete="off"
            placeholder="clave"
            onChange={(e) => setClave(e.target.value)}
          />
          <input
            type="button"
            className="fadeIn fourth"
            value="Ingresar"
            onClick={(e) => handleIngresar()}
            
          />

          {/* <input
            type="button"
            className="fadeIn fourth"
            value="test modal"
            onClick={(e) => {
              modalDialogService.Alert("Prueba1");
              modalDialogService.BloquearPantalla(true);
            }}
          /> */}

          <div id="formFooter">
            <a href="/" className="underlineHover">
              ¿Olvido su clave?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
