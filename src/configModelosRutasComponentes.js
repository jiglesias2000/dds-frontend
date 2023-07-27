import { config } from "./config.js";

const modelos_rutas_conmponentes = [
  {
    abmConfigAbm: {
      Titulo: "Equipos", // Titulo del ABM
      Modelo_Recurso: "Equipos", //Modelo Orm, Recurso para url
      IdCampo: "IdEquipo", // convencion: autonumerico
      ActivoCampo: "Activo", // convencion: booleano
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
      OrdenCampo: [["Nombre", "ASC"]],
    },
    abmConfigRegistro: [
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
    ],
  }, // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Copas",
      Modelo_Recurso: "Copas",
      IdCampo: "IdCopa",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: false,

      Paginacion: true,
    },
    abmConfigRegistro: [
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
        name: "FechaInicio",
        label: "Fecha de Inicio",
        type: "date",
        Listado: true,
      },
    ],
  }, // ------------------------------

  {
    abmConfigAbm: {
      Titulo: "Jugadores",
      Modelo_Recurso: "Jugadores",
      IdCampo: "IdJugador",
      ActivoCampo: "Activo",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
    },
    abmConfigRegistro: [
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
    ],
  }, // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Estadios",
      Modelo_Recurso: "Estadios",
      IdCampo: "IdEstadio",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: false,
      Paginacion: true,
    },
    abmConfigRegistro: [
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
        name: "FechaInauguracion",
        label: "Fecha de Inauguracion",
        type: "date",
        Listado: true,
      },
    ],
  }, // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Ligas",
      Modelo_Recurso: "Ligas",
      IdCampo: "IdLiga",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: false,
      Paginacion: true,
    },
    abmConfigRegistro: [
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
    ],
  }

  , // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Articulos generico",
      Modelo_Recurso: "Articulos",
      IdCampo: "IdArticulo",
      ActivoCampo: "Activo",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
    },
    abmConfigRegistro:  [
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
              value: /^[0-9]*$/,
              message: "El código de barras debe ser numérico??",
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
          value: new Date().toISOString().substring(0, 10),
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
      ],
  }

  , // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Articulos Familias generico",
      Modelo_Recurso: "ArticulosFamilias",
      IdCampo: "IdArticuloFamilia",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: false,
      Paginacion: true,
    },
    abmConfigRegistro: [
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
          Listado: true,
        },
      ],
  },
];


for (let index = 0; index < modelos_rutas_conmponentes.length; index++) {
  modelos_rutas_conmponentes[index].abmConfigBuscar =
  modelos_rutas_conmponentes[index].abmConfigRegistro
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

  modelos_rutas_conmponentes[index].abmConfigListado = 
  modelos_rutas_conmponentes[index].abmConfigRegistro
    .filter((item) => item.Listado)
    .map((item) => {
      return { name: item.name, label: item.label, type: item.type };
    });
}

export default modelos_rutas_conmponentes;
