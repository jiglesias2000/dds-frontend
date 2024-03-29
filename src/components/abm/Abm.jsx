import React, { useState, useEffect } from "react";

import httpService from "../../services/http.service";
import AbmListado from "./AbmListado";
import AbmRegistro from "./AbmRegistro";
import modalDialogService from "../../services/modalDialog.service";
import { config } from "../../config"


function Abm({
  abmConfigAbm,
  abmConfigBuscar,
  abmConfigListado,
  abmConfigRegistro,
  AccionABMCInicial
}) {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState(AccionABMCInicial ?? "L");
  const [Items, setItems] = useState(null); // items a mostrar en el listado
  const [Item, setItem] = useState(null); // item en alta/consulta/modificacion; usado en BuscarporId (Modificar, Consultar)
  const [ItemBuscar, setItemBuscar] = useState(null); //item con los datos de búsqueda; usado en Buscar (Listado)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);

  const urlResource = config.urlServidor + "/api/" + abmConfigAbm.Modelo_Recurso;

  useEffect(() => {
    // inicializa todos los estados pq se ejecuta el mismo componente segun distintos paths y entonces todos compartirian el mismo estado!!!
    //    le damos solucion con el useEffect basado en si cambia el parametro abmConfigBuscar
    setAccionABMC("L");
    setItems(null);
    setItem(null);
    let itemBuscar = {};
    abmConfigBuscar.forEach((field) => {
      itemBuscar[field.name] = field?.valueBuscar ?? null;  // pq si es undefined no lo enlaza react-hook-form
    });
    setItemBuscar(itemBuscar);
    setRegistrosTotal(0);
    setPagina(1);

  }, [abmConfigBuscar]);



  // desde el boton buscar del listado
  async function BuscarPagina1(_itemBuscar) {
    setItemBuscar(_itemBuscar);
    setPagina(1);
    Buscar(_itemBuscar, 1);
  }

  // desde el paginador
  async function BuscarPagina(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }
    Buscar(ItemBuscar, _pagina);
  }

  
  async function Buscar(_itemBuscar, _pagina) {
    let itemBuscar = { ..._itemBuscar, Pagina: _pagina };

    const resp = await httpService.get(urlResource, {
      params: itemBuscar,
    });
    const data = resp.data;

    if (data.Items) {
      // con paginacion en el backend, viene dentro de un objeto con Items y RegistrosTotal
      setItems(data.Items);
      setRegistrosTotal(data.RegistrosTotal);
    } else {
      // sin paginacion en el backend, viene solo con los items
      setItems(data);
      setRegistrosTotal(data.length);
    }

  }

  async function BuscarPorId(item, accionABMC) {
    const resp = await httpService.get(
      urlResource + "/" + item[abmConfigAbm.IdCampo]
    );
    const data = resp.data;
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (abmConfigAbm.ActivoCampo && !item[abmConfigAbm.ActivoCampo]) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  // async para evitar un problema con react-select al limpiar el campo
  async function  Agregar() {

    let itemAlta = {};
    abmConfigRegistro.forEach( (field) => {
      itemAlta[field.name] = field?.value ?? null;  
    });
    await setItem(itemAlta);
    setAccionABMC("A");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
        (item[abmConfigAbm.ActivoCampo] ? "desactivar" : "activar") +
        " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await httpService.delete(
          urlResource + "/" + item[abmConfigAbm.IdCampo]
        );
        await BuscarPagina();
      }
    );
  }

  async function Grabar(item) {
    if (AccionABMC === "A") {
      await httpService.post(urlResource, item);
    } else {
      await httpService.put(
        urlResource + "/" + item[abmConfigAbm.IdCampo],
        item
      );
    }
    await BuscarPagina();
    Volver();

    modalDialogService.Alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente.",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "success"
    );
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      {/* { console.log(AccionABMC)}
      { console.log(Item)} */}
      <div className="tituloPagina">
        {abmConfigAbm.Titulo} <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      <AbmRegistro
        {...{
          Modo: "Buscar",
          AccionABMC,
          Item: ItemBuscar,
          Boton1Accion: BuscarPagina1,
          Boton2Accion: Agregar,
          ConfigRegistro: abmConfigBuscar,
        }}
      />
      {/* {AccionABMC === "L" && (
      )} */}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <AbmListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Buscar: BuscarPagina,
            abmConfigListado,
            abmConfigAbm,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      <AbmRegistro
        {...{
          Modo: "Registro",
          AccionABMC,
          Item,
          Boton1Accion: Grabar,
          Boton2Accion: Volver,
          ConfigRegistro: abmConfigRegistro,
        }}
      />
    </div>
  );
}

export { Abm };
