import { Abm } from "./abm/Abm";
import { config } from "../config";
import moment from "moment";

function EquiposG() {
  const abmConfigAbm = {
    Titulo: "Equipos",
    urlResource: config.urlServidor + "/api/Equipos",
    IdCampo: "IdEquipo",
    ActivoCampo: "Activo",
    AccionesABM: { Consultar: true, Modificar: true, ActivarDesactivar: true },
    Paginacion: true,
  };

  // value son los valores por defecto para agregar un registro
  const abmConfigRegistro = [
    {
      name: "Nombre",
      type: "text",
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
      type: "number",
      validation: {
        required: { value: true, message: "El Precio es requerido" },
      },
      Buscar: true,
      Listado: true,
    },
    {
      name: "FechaAlta",
      label: "Fecha de Alta",
      type: "date",
    },
    {
      name: "CdadJugadores",
      label: "Cant de Jugadores",
      type: "number",
      Buscar: true,
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
      value: true,
      Buscar: true,
      Listado: true,
    },
  ];

  const abmConfigBuscar = abmConfigRegistro
    .filter((item) => item.Buscar)
    .map((item) => {
      return {
        name: item.name,
        label: item.label,
        type: item.type,
        typeForm: item.typeForm,
        data: item.data,
      };
    });

  // los item del listado que vienen del backend, deben incluir el IdCampo para el key de react
  const abmConfigListado = abmConfigRegistro
    .filter((item) => item.Listado)
    .map((item) => {
      return { name: item.name, label: item.label, type: item.type };
    });

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

export { EquiposG };
