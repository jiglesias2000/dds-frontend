
import React, { useState, useEffect } from "react";
import { articulosfamiliasService } from "../../services/articulosFamilias.service";

function ArticulosFamilias() {
  const tituloPagina = 'ArticulosFamilias';
  const [articulosFamilias, setArticulosFamilias] = useState(null);

  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarArticulosFamilas();
  }, []);
  
  async function BuscarArticulosFamilas() {
    let data = await articulosfamiliasService.Buscar();
    //articulosFamilias  = data;   // NO HACER ESTO, no se actualiza el componente
    setArticulosFamilias(data);
  };

  // para probar ErrorBoundary de app.js
  // throw new Error("Error en ArticulosFamilias");  

  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>IdArticuloFamilia</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {articulosFamilias &&
            articulosFamilias.map((articulofamilia) => (
              <tr key={articulofamilia.IdArticuloFamilia}>
                <td>{articulofamilia.IdArticuloFamilia}</td>
                <td>{articulofamilia.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );

}

export { ArticulosFamilias };
