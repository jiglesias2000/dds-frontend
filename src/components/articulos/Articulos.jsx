import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ArticulosEdit from "./ArticulosEdit";

function Articulos() {
  const [IdArticulo, setIdArticulo] = useState(0);
  let Titulo = "Articulos";
  let TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  let Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados...",
  };
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);

  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [nombre, setNombre] = useState("");
  const [activo, setActivo] = useState("");

  const [ArticulosFamilias, setArticulosFamilias] = useState(null);

  const urlBase = "https://pymes2021.azurewebsites.net/api/articulos";
  
  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    axios
      .get("https://pymes2021.azurewebsites.net/api/articulosfamilias")
      .then((x) => {
        setArticulosFamilias(x.data);
      });
  }, []);

  
  function Buscar(_pagina) {
    if (_pagina === undefined) 
    {
      _pagina = Pagina;
    }
    else{
      setPagina(_pagina);  // OJO Pagina se actualiza para el proximo render
      let VerValorPagina = Pagina;  // ponemos este let solo para ver que el valor aun no se actulizo
    }
    
    const url = urlBase + `?nombre=${nombre}&activo=${activo}&pagina=${_pagina}`;
    axios.get(url).then((x) => {
      setItems(x.data.Items);
      setRegistrosTotal(x.data.RegistrosTotal);

      //generar array de las paginas para mostrar en el paginador
      let _paginas = []
      for (let index = 1; index <= Math.ceil(x.data.RegistrosTotal / 10); index++) {
        _paginas.push(index);
      }
      setPaginas(_paginas);

    });
  }

  function BuscarPorId(Item1, AccionABMC) {
    const url = urlBase + "/" + Item1.IdArticulo;
    axios.get(url).then((x) => {
      setIdArticulo(Item1.IdArticulo);
      setAccionABMC(AccionABMC);
      setItem({
        ...x.data,
        FechaAlta: moment(x.data.FechaAlta).format("DD/MM/YYYY"),
      });
    });
  }
  function Consultar(Item1) {
    BuscarPorId(Item1, "C");
  }
  function Modificar(Item1) {
    if (!Item1.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(Item1, "M");
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdArticulo: 0,
      Nombre: "",
      Precio: "",
      Stock: "",
      CodigoDeBarra: "",
      IdArticuloFamilia: "",
      FechaAlta: moment(new Date()).format("DD/MM/YYYY"),
      Activo: true,
    });
  }

  function Imprimir() {
    alert("En desarrollo...");
  }

  function ActivarDesactivar(Item1) {
    const url = urlBase + "/" + Item1.IdArticulo;
    axios.delete(url).then((x) => {
      Buscar();
    });
  }

  function Grabar(Item1) {
    let obj = {
      ...Item1,
      //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
      FechaAlta: moment(Item1.FechaAlta, "DD/MM/YYYY").format("YYYY-MM-DD"),
    };

    // agregar post
    if (AccionABMC === "A") {
      axios.post(urlBase, obj).then((res) => {
        Volver();
        alert("Registro agregado correctamente.");
        Buscar();
      });
    } else {
      // modificar put
      axios.put(urlBase + "/" + Item1.IdArticulo, obj).then((res) => {
        Volver();
        alert("Registro modificado correctamente.");
        Buscar();
      });
    }
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        {Titulo} <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <form name="FormBusqueda">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-4 col-md-2">
                <label className="col-form-label">Nombre:</label>
              </div>
              <div className="col-sm-8 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setNombre(e.target.value)}
                  value = {nombre}
                  maxLength="55"
                />
              </div>
              <div className="col-sm-4 col-md-2">
                <label className="col-form-label">Activo:</label>
              </div>
              <div className="col-sm-8 col-md-4">
                <select
                  className="form-control"
                  onChange={(e) => setActivo(e.target.value)}
                  value = {activo}
                >
                  <option value={''}></option>
                  <option value={false}>NO</option>
                  <option value={true}>SI</option>
                </select>
              </div>
            </div>

            <hr />

            {/* Botones */}
            <div className="row justify-content-center botones">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => 
                  {
                    Buscar(1); 
                  }
                }
              >
                <i className="fa fa-search"> </i> Buscar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  Agregar();
                }}
              >
                <i className="fa fa-plus"> </i> Agregar
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <div id="divTablaResultados">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead>
              <tr>
                <th className="text-center">Nombre</th>
                <th className="text-center">Precio</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Fecha de Alta</th>
                <th className="text-center">Activo</th>
                <th className="text-center text-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.IdArticulo}>
                    <td>{Item.Nombre}</td>
                    <td className="text-right">{Item.Precio}</td>
                    <td className="text-right">{Item.Stock}</td>
                    <td className="text-right">
                      {moment(Item.FechaAlta).format("DD/MM/YYYY")}
                    </td>
                    <td>{Item.Activo ? "SI" : "NO"}</td>
                    <td className="text-center text-nowrap">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        title="Consultar"
                        onClick={() => Consultar(Item)}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        title="Modificar"
                        onClick={() => Modificar(Item)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button
                        className={
                          "btn btn-sm " +
                          (Item.Activo
                            ? "btn-outline-danger"
                            : "btn-outline-success")
                        }
                        title={Item.Activo ? "Desactivar" : "Activar"}
                        onClick={() => ActivarDesactivar(Item)}
                      >
                        <i
                          className={
                            "fa fa-" + (Item.Activo ? "times" : "check")
                          }
                        ></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Paginador*/}
          <div className="paginador">
            <div className="row">
              <div className="col">
                <span className="pyBadge">Registros: {RegistrosTotal}</span>
              </div>
              <div className="col text-center">
                Pagina: &nbsp;
                <select value={Pagina} onChange={(e) =>  { Buscar(e.target.value); } } >
                  {Paginas?.map((x) => (
                    <option value={x} key={x}>
                      {x}
                    </option>
                  ))}
                </select>
                &nbsp; de {Paginas?.length} 
              </div>

              <div className="col text-right">
                <button className="btn btn-primary" onClick={() => Imprimir()}>
                  <i className="fa fa-print"></i>Imprimir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No se encontraron registros */}
      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          {Mensajes["SD"]}
        </div>
      )}

      {AccionABMC !== "L" && (
        <ArticulosEdit
          IdArticulo={IdArticulo}
          AccionABMC={AccionABMC}
          ArticulosFamilias={ArticulosFamilias}
          Item={Item}
          Mensajes={Mensajes}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
  );
}

export { Articulos };
