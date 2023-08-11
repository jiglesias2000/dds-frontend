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
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Precio",
        type: "N(10,2)",
        required: true,
        requiredMsj: "El precio es requerido",
        Buscar: true,
        Listado: true,
      },
      {
        name: "FechaAlta",
        label: "Fecha de Alta",
        type: "F",
      },
      {
        name: "CdadJugadores",
        label: "Cant de Jugadores",
        type: "N(10)",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Activo",
        type: "B",
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
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "FechaInicio",
        label: "Fecha de Inicio",
        type: "F",
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
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 3,
        minLengthMsj: "El nombre debe tener al menos 3 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Apellido",
        type: "C(100)",
        required: true,
        requiredMsj: "El Apellido es requerido",
        minLength: 5,
        minLengthMsj: "El Apellido debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "FechaNacimiento",
        label: "Fecha de Nacimiento",
        type: "F",
      },
      {
        name: "Activo",
        type: "B",
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
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "FechaInauguracion",
        label: "Fecha de Inauguracion",
        type: "F",
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
        name: "Datos Identificatorios",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "Nombre",
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Descripcion",
        type: "C(100)",
        required: true,
        requiredMsj: "La descripcion es requerida",
        minLength: 10,
        minLengthMsj: "La descripcion debe tener al menos 10 caracteres",
        Buscar: false,
        Listado: false,
      },
      {
        name: "Datos Comerciales",
        typeForm: "subtitulo",
        icon: "fa fa-money",
      },

      {
        name: "NumEquipos",
        label: "Numero de Equipos",
        type: "N(10)",
        required: true,
        Buscar: false,
        Listado: false,
      },
      {
        name: "IngresosMediosEquipo",
        label: "Ingreso Medio del Equipo",
        type: "N(10)",
        Buscar: false,
        Listado: false,
      },

      {
        name: "FechaInicio",
        label: "Fecha de Inicio",
        type: "F",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Pais",
        type: "C(100)",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Activo",
        type: "B",
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
      Titulo: "Articulos generico",
      Modelo_Recurso: "Articulos",
      IdCampo: "IdArticulo",
      ActivoCampo: "Activo",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
    },
    abmConfigRegistro: [
      {
        name: "Nombre",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Precio",
        type: "N(10)", // number/date   => default:text
        required: true,
        requiredMsj: "El precio es requerido",
        min: 1,
        minMsj: "El precio debe ser mayor a cero",
        max: 1000000,
        maxMsj: "El precio debe ser menor a 1000000",
        Listado: true,
      },
      {
        name: "Stock",
        type: "N(10)",
        required: true,
        requiredMsj: "El stock es requerido",
        Listado: true,
      },
      {
        name: "CodigoDeBarra",
        label: "Codigo de Barra",
        required: true,
        requiredMsj: "El código de barras es requerido",
        pattern: /^[0-9]{13}$/, 
        patternMsj: "El código de barras debe ser 13 numeros",
      },
      {
        name: "IdArticuloFamilia",
        label: "Articulos Familias",
        typeForm: "select",
        apiData: config.urlServidor + "/api/articulosFamilias",
        required: true,
        requiredMsj: "Debes seleccionar una familia de artículos",
        placeholder:"Seleccione una familia de artículos"
      },
      {
        name: "Descripcion",
        typeForm: "textarea",
        minLength: 10,
        minLengthMsj: "La descripción debe tener al menos 10 caracteres",
      },
      {
        name: "FechaAlta",
        label: "Fecha de alta",
        type: "F",
        value: 'today',
        Listado: true,
      },
      {
        name: "Activo",
        type: "B",
        typeForm: "select",
        disabled: true,
        data: [
          { Id: null, Nombre: null },
          { Id: true, Nombre: "SI" },
          { Id: false, Nombre: "NO" },
        ],
        value: true, // valor por defecto, solo para agregar
        Buscar: true,
        Listado: true,
      },
    ],
  }, // ------------------------------

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
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Listado: true,
      },
    ],
  }, // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Personas",
      Modelo_Recurso: "Personas",
      IdCampo: "IdPersona",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
    },
    abmConfigRegistro: [
      {
        name: "Datos Personales",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "Nombre",
        placeholder: "Apellido y Nombre",
        type: "C(60)",
        required: true,
        requiredMsj: "El nombre es requerido", //default: El Campo es requerido
        minLength: 3,
        minLengthMsj: "El nombre debe tener al menos 3 caracteres", // default
        maxLength: 20, 
        //maxLengthMsj: "El nombre debe tener como maximo 100 caracteres", //default: El campo debe tener como maximo N caracteres
        Buscar: true,
        Listado: true,
      },
      {
        name: "TipoDocumento",
        label: "Tipo Documento",
        type: "C(3)",
        data: [
          { i: "DNI", n: "Documento Nacional de Identidad" },
          { i: "LC", n: "Libreta Civica" },
          { i: "LE", n: "Libreta de Enrolamiento" },
          { i: "PSP", n: "Pasaporte" },
        ],
        typeForm: "select", //exige data ó urlData
        value: "LE",
      },
      {
        name: "NumeroDocumento",
        label: "Numero de Documento",
        type: "N(10,0)",
        required: true,
        maxLength: 8,
      },
      {
        name: "Sexo",
        type: "C(1)",
        typeForm: "radio", //exige data ó urlData
        data: [
          { i: "M", n: "Masculino" },
          { i: "F", n: "Femenino" },
        ],
      },

      {
        name: "FechaNacimiento",
        label: "Fecha de Nacimiento",
        type: "F", // F ó FH
        value: "today", // calcular dia de hoy
      },
      {
        name: "EstadoCivil",
        label: "Estado Civil",
        type: "C(1)",
        typeForm: "select",
        data: [
          { i: "S", n: "Soltero" },
          { i: "C", n: "Casado" },
          { i: "D", n: "Divorciado" },
          { i: "V", n: "Viudo" },
        ],
      },
      {
        name: "Mail",
        type: "C(60)",
        typeForm: "email",
        required: true,
        requiredMsj: "El mail es requerido",
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
      },
      //{ name: "Telefono" },
      {
        name: "IngresosMensuales",
        label: "Ingresos Mensuales",
        type: "N(10,2)", // N(10,2) es moneda, con icono en pantalla
      },
      {
        name: "ComidaPreferida",
        label: "Comida Preferida", // (generar label from PascalCase)
        typeForm: "select",
        data: [
          { i: "lom", n: "Lomito" },
          { i: "pza", n: "Pizza" },
          { i: "emp", n: "Empanada" },
        ],
      },
      { name: "Observaciones", type: "C()", typeForm: "textarea", maxLength: 1000 },
      {
        name: "TieneAutoPropio",
        label: "Tiene auto propio",
        type: "B", // por defecto en un checkbox
      },
      {
        name: "TieneCasaPropia",
        label: "Tiene Casa Propia",
        type: "B", // por defecto en un checkbox
      },

      {
        name: "CasaPropiaDomicilio",
        typeForm: "subtitulo",
        label: "Casa Propia - Domicilio",
      },
      { name: "Calle" },
      { name: "Altura", type: "N(5)" },
      { name: "Localidad", type: "N(10)" },
      {
        name: "Provincia",
        type: "N(10)",
        typeForm: "select",
        data: [
          { i: 1, n: "Cordoba" },
          { i: 2, n: "Buenos Aires" },
          { i: 3, n: "Santa Fe" },
        ],
      },
      { name: "CodigoPostal", type: "C(6)", pattern: "[A-Z]2" },
    ],
  },
  {
    abmConfigAbm: {
      Titulo: "Clientes",
      Modelo_Recurso: "Clientes",
      IdCampo: "IdCliente",
      ActivoCampo: "Activo",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
    },
    abmConfigRegistro: [
      {
        name: "Datos Personales",
        typeForm: "subtitulo",
        icon: "fas fa-user-alt",
      },
      {
        name: "Nombre",
        placeholder: "Apellidos, Nombres",
        type: "C(50)",
        required: true,
        requiredMsj: "El nombre es requerido", //default Dato requerido
        minLength: 3,
        minLengthMsj: "El nombre debe tener al menos 3 caracteres", // default
        maxLength: 50, //si es C(), default segun type (define la propidad html maxlength)
        // maxLengthMsj: "El nombre debe como maximo 60 caracteres", //default
        Buscar: true,
        Listado: true,
        OrdenCampo: [["Nombre", "ASC"]],
      },
      {
        name: "IdTipoDocumento",
        label: "Tipo Documento",
        type: "C(3)",
        data: [
          { i: "DNI", n: "DOCUMENTO NACIONAL DE IDENTIDAD" },
          { i: "LC", n: "LIBRETA CIVICA" },
          { i: "LE", n: "LIBRETA DE ENROLAMIENTO" },
          { i: "PSP", n: "PASAPORTE" },
        ],
        typeForm: "select", //exige data ó urlData
        value: "DNI",
      },
      {
        name: "NumeroDocumento",
        label: "Numero de Documento",
        type: "N(10,0)",
        required: true,
        maxLength: 8,
        Listado: true,
      },
      {
        name: "IdSexo",
        label: "Sexo",
        type: "C(1)",
        typeForm: "radio", //exige data ó urlData
        data: [
          { i: "F", n: "FEMENINO" },
          { i: "M", n: "MASCULINO" },
        ],
      },

      {
        name: "FechaNacimiento",
        label: "Fecha de Nacimiento",
        type: "F", // F ó FH
        value: "today", // calcular dia de hoy
      },
      {
        name: "IdEstadoCivil",
        label: "Estado Civil",
        type: "C(1)",
        typeForm: "select",
        data: [
          { i: "S", n: "SOLTERO" },
          { i: "Z", n: "CELIBE" },
          { i: "C", n: "CASADO" },
          { i: "D", n: "DIVORCIADO" },
          { i: "V", n: "VIUDO" },
        ],
      },
      {
        name: "Mail",
        type: "C(60)",
        typeForm: "email",
        required: true,
        requiredMsj: "El mail es requerido",
        pattern: /^[a-z0-9._%+-]@[a-z0-9.-].[a-z]{2,}$/,
      },
      {
        name: "Observaciones",
        type: "C()",
        typeForm: "textarea",
        required: false,
      },
      {
        name: "Datos Comerciales",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "Cuit",
        type: "N(13)", 
        Listado: true,
      },
      {
        name: "CreditoMaximo",
        label: "Credito Maximo",
        type: "N(10,2)", // N(10,2) es moneda, con icono en pantalla
      },
      {
        name: "TieneTrabajo",
        label: "Tienda Trabajo",
        type: "B"
      },
      {
        name: "TieneAuto",
        label: "Tiene auto",
        type: "B"
      },
      {
        name: "TieneCasa",
        label: "Tiene casa",
        type: "B"
      },

      {
        name: "Datos Domicilio",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "IdPais",
        label: "Pais",
        type: "N(10)",
        typeForm: "select",
        data: [
          { i: 1, n: "ARGENTINA" },
          { i: 2, n: "BRASIL" },
          { i: 3, n: "CHILE" },
        ],
      },
      {
        name: "IdProvincia",
        label: "Provincia",
        type: "N(10)",
        typeForm: "select",
        data: [
          { i: 1, n: "CORDOBA" },
          { i: 2, n: "BUENOS AIRES" },
          { i: 3, n: "SANTA FE" },
        ],
      },
      {
        name: "IdDepartamento",
        label: "Departamento",
        type: "N(10)",
        typeForm: "select",
        data: [
          { i: 1, n: "CAPITAL" },
          { i: 2, n: "NORTE" },
          { i: 3, n: "SUR" },
        ],
      },
      {
        name: "Localidad",
        type: "C(100)",
      },
      { name: "Calle" },
      { name: "NumeroCalle", label:"Numero Calle", type: "N(5)", max:99999 },      
      {
        name: "Datos Internos",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "FechaIngreso",
        label: "Fecha de Ingreso",
        type: "F", // F ó FH
        value: "today", // calcular dia de hoy
      },
      {
        name: "FechaEgreso",
        label: "Fecha de Egreso",
        type: "F", // F ó FH
      },
      {
        name: "Activo",
        type: "B",
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
      }
    ],
  },
];

for (let index = 0; index < modelos_rutas_conmponentes.length; index++) {
  for (
    let i = 0;
    i < modelos_rutas_conmponentes[index].abmConfigRegistro.length;
    i++
  ) {
    let item = modelos_rutas_conmponentes[index].abmConfigRegistro[i];

    if (item.type === "F" && item.value === "today") {
      item.value = new Date().toISOString().substring(0, 10);
    }

    if (
      (item.required ||
        item.maxLength ||
        item.minLength ||
        item.min ||
        item.max || item.pattern
        ) &&
      !item.validation
    ) {
      item.validation = {};
    }
    if (item.required) {
      item.validation.required = {
        value: true,
        message:
          item.requiredMsj ??
          "El campo es requerido",
      };
    }
    if (item.minLength) {
      item.validation.minLength = {
        value: item.minLength,
        message:
          item.minLengthMsj ??
          "El campo debe tener al menos " + item.minLength + " caracteres",
      };
    }
    if (item.maxLength) {
      item.validation.maxLength = {
        value: item.maxLength,
        message:
          item.maxLengthMsj ??
          "El campo debe tener como maximo " + item.maxLength + " caracteres",
      };
    }

    if (item.min) {
      item.validation.min = {
        value: item.min,
        message:
          item.minMsj ?? "El campo debe ser mayor o igual a " + item.min,
          
      };
    }
    if(item.max){
      item.validation.max = {
        value: item.max,
        message:
          item.maxMsj ?? "El campo debe ser menor o igual a " + item.max,
          
      };
    }
    if (item.pattern) {
      item.validation.pattern = {
        value: item.pattern,
        message:
          item.patternMsj ??
          "El campo no cumple con el formato requerido",
      };
    }


  }

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
          apiData: item.apiData,
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
