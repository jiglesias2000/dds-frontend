import { Abm } from "./abm/Abm";
import { config } from "../config";
import moment from "moment";

function LigasG() {
  const abmConfigAbm = {
    Titulo: "Ligas",
    urlResource: config.urlServidor + "/api/Ligas",
    IdCampo: "IdLiga",
    ActivoCampo: "",
    AccionesABM: { Consultar: true, Modificar: true, ActivarDesactivar: false },
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
      name: "Descripcion",
      type: "text",
      validation: {
        required: { value: true, message: "La descripcion es requerida" },
        minLength: {
          value: 10,
          message: "La descripcion debe tener al menos 5 caracteres",
        },
      },
      Buscar: false,
      Listado: false,
    },
    
    {
      name: "NumEquipos",
      label: "Numero de Equipos",
      type: "number",
      Buscar: false,
      Listado: false,
    },
    {
      name: "IngresosMediosEquipo",
      label: "Ingreso Medio del Equipo",
      type: "number",
      Buscar: false,
      Listado: false,
    },

    {
      name: "FechaInicio",
      label: "Fecha de Inicio",
      type: "date",
      Buscar: true,
      Listado: true,
    },
    {
      name: "Pais",
      type: "text",
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

export { LigasG };
