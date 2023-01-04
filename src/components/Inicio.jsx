import React from "react";
import { Link } from "react-router-dom";

function Inicio() {
  return (
      <div className="mt-4 p-5 rounded" style={{backgroundColor:"lightgray"}} >
        <h1>Pymes 2023</h1>
        <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
        <p>
          Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite y 
          multiples capas en Javascript.
        </p>
        <p>
          Frontend: Single Page Aplication, HTML, CSS, Bootstrap, NodeJs,
          Javascript y React.
        </p>
        <p>
          Usuarios disponibles: admin, juan (ambos con clave 123)
        </p>
        <Link to="/articulosfamilias" className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>  Ver Articulos Familias
        </Link>
      </div>
  );
}

export { Inicio };
