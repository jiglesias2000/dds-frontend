
import React, { useState, useEffect } from "react";
import { articulosfamiliasService } from "../../services/articulosfamilias.service";

function ArticulosFamilias() {

  const [articulosFamilias, setArticulosFamilias] = useState(null);

  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarArticulosFamilas();
  }, []);
  
  async function BuscarArticulosFamilas() {
    let data = await articulosfamiliasService.buscar();
    setArticulosFamilias(data);
  };

  

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
          {articulosFamilias &&
            articulosFamilias.map((articulofamilia) => (
              <tr key={articulofamilia.IdArticuloFamilia}>
                <td>{articulofamilia.IdArticuloFamilia}</td>
                <td>{articulofamilia.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

}

export { ArticulosFamilias };
