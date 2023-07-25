import { Abm } from "./abm/Abm";
import { config } from "../config";
import moment from "moment";

function JugadoresG() {
  const abmConfigAbm = {
    Titulo: "Jugadores",
    urlResource: config.urlServidor + "/api/jugadores",
    IdCampo: "IdJugador",
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
      name: "Apellido",
      type: "text",
      validation: {
        required: { value: true, message: "El Apellido es requerido" },
        minLength: {
          value: 5,
          message: "El Apellido debe tener al menos 5 caracteres",
        },
      },
      Buscar: true,
      Listado: true,
    },
    {
      name: "FechaNacimiento",
      label: "Fecha de Nacimiento",
      type: "date",
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

export { JugadoresG };
