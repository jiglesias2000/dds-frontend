import React, { useState, useRef, useEffect } from "react";
import modelos_rutas_conmponentes from "../configModelosRutasComponentes";
import { set } from "react-hook-form";
import AbmRegistro from "./abm/AbmRegistro";

export function TestAbmRegistro() {
  const [modelo, setModelo] = useState(
    modelos_rutas_conmponentes.find(
      (x) => (x.abmConfigAbm.Modelo_Recurso = "Articulos")
    ).abmConfigRegistro
  );

  const [modeloEdicion, setModeloEdicion] = useState(
    JSON.stringify(modelo, null, 2)
  );

  return (
    <div>
      <div>
      <label className="col-3" >Modelo: </label>
      <select      
        className="form-select col-9"
        onChange={(e) => { 
          const modeloElegido = modelos_rutas_conmponentes.find(
            (x) => (x.abmConfigAbm.Modelo_Recurso === e.target.value)
          ).abmConfigRegistro
          setModelo(modeloElegido); 
          setModeloEdicion( JSON.stringify(modeloElegido, null, 2));} 
        }
      >
        {modelos_rutas_conmponentes.map((option, index) => (
          <option key={index} value={option.abmConfigAbm.Modelo_Recurso}>
            {option.abmConfigAbm.Modelo_Recurso}
          </option>
        ))}
      </select>
      </div>
      <h1>Modelo</h1>
      <hr />

      <div className="row">
        <div className="col">
          <textarea
            rows="10"
            className="form-control"
            onChange={(e) => {
              setModeloEdicion(e.target.value);
            }}
            value={modeloEdicion}
          />
          <button
            className="form-control btn btn-primary"
            onClick={() => setModelo(JSON.parse(modeloEdicion))}
          >
            Actualizar
          </button>
        </div>
      </div>

      <hr />
      <hr />
      <h1> Componente Abm Generico</h1>
      <hr />
      <AbmRegistro
        {...{
          Modo: "Registro",
          AccionABMC: "A",
          Item: {},
          Boton1Accion: null,
          Boton2Accion: null,
          ConfigRegistro: modelo,
        }}
      />
    </div>
  );
}
