import { Abm } from "./abm/Abm";
import { config } from "../config";
import moment from "moment";

function ArticulosFamiliasG() {
  const abmConfigAbm = {
    Titulo: "Articulos Familias generico",
    urlResource: config.urlServidor + "/api/articulosfamilias",
    IdCampo: "IdArticuloFamilia",
    ActivoCampo: "",
    // acciones en el listado
    AccionesABM: { Consultar: true, Modificar: true, ActivarDesactivar: false },
    Paginacion: false,
  };

  // value son los valores por defecto
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

export { ArticulosFamiliasG };
