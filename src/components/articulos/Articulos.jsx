import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import ArticulosBuscar from "./ArticulosBuscar";
import ArticulosListado from "./ArticulosListado";
import ArticulosRegistro from "./ArticulosRegistro";
import { articulosfamiliasService } from "../../services/articulosfamilias.service";
import { articulosService } from "../../services/articulos.service";

function Articulos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);    // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [ArticulosFamilias, setArticulosFamilias] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    console.log("mounting Articulos");
    async function BuscarArticulosFamilas() {
      let data = await articulosfamiliasService.buscar();
      setArticulosFamilias(data);
      console.log("buscar articulosfamilias");
    }
    BuscarArticulosFamilas();
    return () => {
      console.log("unmounting Articulos");
    };
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else _pagina = Pagina;

    try {
      const data = await articulosService.Buscar(Nombre, Activo, _pagina);
      setItems(data.Items);
      setRegistrosTotal(data.RegistrosTotal);

      //generar array de las paginas para mostrar en select del paginador
      const arrPaginas = [];
      for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
        arrPaginas.push(i);
      }
      setPaginas(arrPaginas);
    } catch (error) {
      alert(error.message);
    }
  }

  async function BuscarPorId(item) {
    const data = await articulosService.BuscarPorId(item);
    try {
      
      setItem({
        ...data,
        FechaAlta: moment(data.FechaAlta).format("DD/MM/YYYY"),
      });
    } catch (error) {
      alert(error.message);
    }
  }

  function Consultar(item) {
    setAccionABMC("C");
    BuscarPorId(item);
  }
  function Modificar(item) {
    if (!item.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    setAccionABMC("M");
    BuscarPorId(item);
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

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Esta seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
      try {
        await articulosService.ActivarDesactivar(item);
        Buscar();
      } catch (error) {
        alert(error.message);
      }
    }
  }

  async function Grabar(item) {
    // creamos una copia superficial (otra referencia), porque el item original esta enlazado a la UI y al modificar la fecha no queremos que se vea en la patalla.
    const itemCopia = {
      ...item,
      //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
      FechaAlta: moment(item.FechaAlta, "DD/MM/YYYY").format("YYYY-MM-DD"),
    };

    try {
      // agregar o modificar
      await articulosService.Grabar(itemCopia);
      Volver();
      Buscar();
      setTimeout(() => {
        alert(
          "Registro " +
            (AccionABMC === "A" ? "agregado" : "modificado") +
            " correctamente."
        );
      }, 0);
    } catch (error) {
      alert(error.message);
    }
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  // mejorar performance
  // const memoArticulosListado = useMemo(
  //   () => (
  //     <ArticulosListado
  //       Items={Items}
  //       Consultar={Consultar}
  //       Modificar={Modificar}
  //       ActivarDesactivar={ActivarDesactivar}
  //       Imprimir={Imprimir}
  //       Pagina={Pagina}
  //       RegistrosTotal={RegistrosTotal}
  //       Paginas={Paginas}
  //       Buscar={Buscar}
  //     />
  //   ),
  //   [Items]
  // );

  return (
    <div>
      <div className="tituloPagina">
        Articulos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && 
        <ArticulosBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      }

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && 
        <ArticulosListado
          {...{Items, Consultar, Modificar, ActivarDesactivar, Imprimir, Pagina, RegistrosTotal, Paginas, Buscar}}
        />
      }

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <ArticulosRegistro {... {AccionABMC,ArticulosFamilias, Item, Grabar, Volver}}
        />
      )}
    </div>
  );
}

export { Articulos };
