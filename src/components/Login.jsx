import React from "react";
import "./Login.css";  //css global

export default function Login() {
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
          />
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="clave"
            autoComplete="off"
            placeholder="clave"
          />
          <input type="submit" className="fadeIn fourth" value="Ingresar" />

          <div id="formFooter">
            <a className="underlineHover">¿Olvido su clave?</a>
          </div>
        </div>
      </div>
    </>
  );
}
