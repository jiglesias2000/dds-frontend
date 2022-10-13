
import React, { useState, useEffect } from "react";
import { articulosfamiliasService } from "../../services/articulosfamilias.service";

function ArticulosFamilias() {
  const [articulosfamilias, setarticulosfamilias] = useState(null);

  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    articulosfamiliasService.getAll().then((x) => {
      setarticulosfamilias(x.data);
    });
  }, []);

  return (
    <div>
      <div className="tituloPagina">Articulos Familias</div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>IdArticuloFamilia</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {articulosfamilias &&
            articulosfamilias.map((articulofamilia) => (
              <tr key={articulofamilia.IdArticuloFamilia}>
                <td>{articulofamilia.IdArticuloFamilia}</td>
                <td>{articulofamilia.Nombre}</td>
              </tr>
            ))}
          {articulosfamilias && !articulosfamilias.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No hay registros</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { ArticulosFamilias };
