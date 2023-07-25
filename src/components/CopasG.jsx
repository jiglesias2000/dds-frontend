import { Abm } from "./abm/Abm";
import { config } from "../config";
import moment from "moment";

function CopasG() {
  const abmConfigAbm = {
    Titulo: "Copas",
    urlResource: config.urlServidor + "/api/Copas",
    IdCampo: "IdCopa",
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
      name: "FechaInicio",
      label: "Fecha de Inicio",
      type: "date",
      Listado: true,
    }
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

export { CopasG };
