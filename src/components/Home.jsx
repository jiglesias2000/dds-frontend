import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="divBody">
      <div className="jumbotron">
        <h1>Pymes 2023</h1>
        <p>Este ejemplo está desarrollado con las siguientes tecnologías:</p>
        <p>
          Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
          multiples capas en Javascript/Typescript.
        </p>
        <p>
          Frontend: Single Page Aplication, HTML, CSS, Bootstrap, NodeJs,
          Javascript y React.
        </p>
        <Link to="articulosfamilias" className="btn btn-lg btn-primary">
          Ver Articulos Familias
        </Link>
      </div>
      <div id="divCards" className="row"></div>
    </div>
  );
}

export { Home };
