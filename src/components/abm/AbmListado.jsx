import React from "react";
import moment from "moment";
import Pagination from "../Pagination";

export default function AbmListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Buscar,
  abmConfigListado,
  abmConfigAbm,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            {abmConfigListado.map((field) => (
              <th key={field.name} className="text-center">
                {field.label ?? field.name}
              </th>
            ))}
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item[abmConfigAbm.IdCampo]}>
                {abmConfigListado.map((field) => (
                  <td key={field.name}
                    className={
                      (field?.type === "number" || field?.type === "date")
                        ? "text-end"
                        : field.type === "boolean"
                        ? "text-center"
                        : "text-start"
                    }
                  >
                    {field?.type === "date"
                      ? moment(Item[field.name]).format("DD/MM/YYYY")
                      : field?.type === "boolean"
                      ? Item[field.name]
                        ? "SI"
                        : "NO"
                      : Item[field.name]}
                  </td>
                ))}

                <td className="text-center text-nowrap">
                  {abmConfigAbm.AccionesABM.Consultar && (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      title="Consultar"
                      onClick={() => Consultar(Item)}
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                  )}
                  {abmConfigAbm.AccionesABM.Modificar && (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      title="Modificar"
                      onClick={() => Modificar(Item)}
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                  )}
                  {abmConfigAbm.AccionesABM.ActivarDesactivar && (
                    <button
                      className={
                        "btn btn-sm " +
                        (Item[abmConfigAbm.ActivoCampo]
                          ? "btn-outline-danger"
                          : "btn-outline-success")
                      }
                      title={
                        Item[abmConfigAbm.ActivoCampo]
                          ? "Desactivar"
                          : "Activar"
                      }
                      onClick={() => ActivarDesactivar(Item)}
                    >
                      <i
                        className={
                          "fa fa-" +
                          (Item[abmConfigAbm.ActivoCampo] ? "times" : "check")
                        }
                      ></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          {abmConfigAbm.Paginacion && (
            <div className="col">
              <Pagination
                itemsCount={RegistrosTotal}
                pageSize="10"
                currentPage={Pagina}
                onPageChange={Buscar}
              />
            </div>
          )}
          <div className="col">
            <button
              className="btn btn-primary float-end"
              onClick={() => Imprimir()}
            >
              <i className="fa fa-print"></i>Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
