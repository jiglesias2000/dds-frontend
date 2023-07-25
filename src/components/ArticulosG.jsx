import { Abm } from "./abm/Abm";
import { config } from "../config";
import moment from "moment";

function ArticulosG() {
  const abmConfigAbm = {
    Titulo: "Articulos generico",
    urlResource: config.urlServidor + "/api/articulos",
    IdCampo: "IdArticulo",
    ActivoCampo: "Activo",
    AccionesABM: { Consultar: true, Modificar: true, ActivarDesactivar: true },
    Paginacion: true,
  };

  // value son los valores por defecto para agregar un registro
  const abmConfigRegistro = [
    {
      name: "Nombre",
      validation: {
        required: { value: true, message: "El nombre es requerido" },
        minLength: {
          value: 5,
          message: "El nombre debe tener al menos 5 caracteres",
        },
      },
      Buscar: true,
      Listado: true,
    },
    {
      name: "Precio",
      type: "number",   // number/date   => default:text
      validation: {
        required: { value: true, message: "El precio es requerido" },
        min: { value: 1, message: "El precio debe ser mayor a cero" },
        max: { value: 1000000, message: "El precio debe ser menor a 1000000" },
      },
      Listado: true,
    },
    {
      name: "Stock",
      type: "number",
      validation: {
        required: { value: true, message: "El stock es requerido" },
      },
      Listado: true,
    },
    {
      name: "CodigoDeBarra",
      label: "Codigo de Barra",
      validation: {
        pattern: {
          value: /^[0-9]$/,
          message: "El código de barras debe ser numérico",
        },
      },
    },
    {
      name: "IdArticuloFamilia",
      label: "Articulos Familias",
      typeForm: "select",
      api: config.urlServidor + "/api/articulosFamilias",
      validation: {
        required: {
          value: true,
          message: "Debes seleccionar una familia de artículos",
        },
      },
    },
    {
      name: "Descripcion",
      typeForm: "textarea",
      validation: {
        minLength: {
          value: 10,
          message: "La descripción debe tener al menos 10 caracteres",
        },
      },
    },
    {
      name: "FechaAlta",
      label: "Fecha de alta",
      type: "date",
      value: moment(new Date()).format("YYYY-MM-DD"),
      Listado: true,
    },
    {
      name: "Activo",
      type: "boolean",
      typeForm: "select",
      disabled: true,
      data: [
        { Id: null, Nombre: null },
        { Id: true, Nombre: "SI" },
        { Id: false, Nombre: "NO" },
      ],
      value: true,  // valor por defecto, solo para agregar
      Buscar: true,
      Listado: true,
    },
  ];

  const abmConfigBuscar = abmConfigRegistro
    .filter((item) => item.Buscar)
    .map((item) => {
        return {name: item.name, label: item.label, type: item.type, typeForm:item.typeForm, data: item.data} ;
    });


  // los item del listado que vienen del backend, deben incluir el IdCampo para el key de react
  const abmConfigListado = abmConfigRegistro
  .filter((item) => item.Listado)
  .map((item) => {
      return {name: item.name, label: item.label, type: item.type} ;
  });
  //abmConfigListado.push({ name: "OtroCampo", label: "Otro Campo", type: "text" });
  
  return (
    <Abm
      {...{
        abmConfigAbm,
        abmConfigBuscar,
        abmConfigListado,
        abmConfigRegistro,
      }}
    />
  );
}

export { ArticulosG };
