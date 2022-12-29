# Desarrollo de Sotware: Frontend
Objetivo: crear una Aplicación frontend con vistas en Html, Boostrap y código javascript con React, que consumira las webapi de nuestro backend: dds-expresss. Nuestra aplicacion estara compuesta por un menu que nos permitirá navegar entre una página de inicio, una página de consulta sobre la tabla ArticulosFamlias y una página que nos permitirá realizar un ABMC sobre la tabla Articulos.

* Version final del proyecto: https://dds-react.azurewebsites.net

* Requisitos tener instalado:
    * Visual studio Code
    * Node.js


## Etapa1
## Proyecto basico
* Creacion del proyecto: Ubicandonos en la carpeta que contendra nuestro proyecto, por ej c:/users/miusuario, desde la consola ejecutamos:
    * comando: npx create-react-app dds-react

      * Observe:
        1. El comando npx esta disponible porque es parte de NodeJs
        2. Que este comando genera una carpeta y varias subcapetas con una seria de archivos que constituyen la plantilla de una nueva aplicacion basada en react
        3. Que se incluye el repositorio git del proyecto

* Para verificar la funcionalidad la plantilla inicial del proyecto recién creado, nos ubicamos dentro de dicha carpeta y podemos ejecutarlo y abrirlo en el explorador con el siguiente comando de consola: 
    * comando: npm run start
    
      * Observe:
        1. El comando anterior abrira el explorador por defecto en la url localhost:3000 y mostrara el proyecto en ejecucion.
        2. Podemos detener nuestro servidor de aplicacion node/react, estando ubicados en la ventana desde donde iniciamos el proyecto y pulsando Ctrl+C o cerrando la misma.
        3. Si cerramos el explorador y no detuvimos la aplicacion (punto anterior), nuestra aplicacion seguira ejecutandose y podemos volver a verla en el explorador con la url por defecto


* Mediante Visual Studio Code, vamos a cambiar la pantalla inicial de nuestro proyecto, dentro de los archivos generados, buscamos src/App.js que es el que proporciona la interface html inicial, y reemplazamos todo su codigo por el siguiente:
```javascript
function App() {
  return (
    <h1>Bienvenidos a Desarrollo de Software!</h1>
    );
}
export default App;
```
* Grabe los cambios y si la aplicacion estaba corriendo, vera como se ha actualizado la salida en el explorador, caso contrario en la ventana de consola vuelva a ejecutarla con el comando: npm run start (o abreviadamente con: npm start)


## Primer componente: Inicio
* Eliminamos todo el contenido del archivo app.js y lo reemplazamos por el codigo de nuestro primer componente:

```javascript
function App() {
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
        <button className="btn btn-lg btn-primary">
          <i className="fa fa-search"> </i>
          Ver Articulos Familias
        </button>
      </div>
    </div>
  );
}
export default App;
```

Observe: 
  1. que hemos usado clases de bootstrap e iconos en nuestro html, por lo cual necesitaremos dichas librerias.
  2. que hemos usado propiedades de css y en react style tiene una sintaxis especial mediante un objeto de javascript.

* Agregamos al proyecto las librerias de Bootstrap y sus dependencias 
    * npm install popper.js bootstrap

* Agregamos al proyecto la libreria de iconos Font-Awwesome  (version 6.20)
    * npm install @fortawesome/fontawesome-free

    *Nota: todos los paquetes/librerias deben instalarse estando ubicados en la carpeta raíz del proyecto.*

* para que las librerias recien instaladas, se carguen en nuestro proyecto y podamos hacer uso de sus funcionalidades, debemos importarlas al mismo, lo que haremos modificando el archivo src/index.js agregando las siguientes lineas de codigo al inicio del mismo:
```javascript
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
```
* Ejecutemos la aplicacion, y verificamos si nuestra salida html tiene aplicadas las clases de bootstrap y puede verse el icono utilizado.

Hasta aquí hemos usado el componente principal de la aplicación: App.js para nuestra página de inicio, pero en realidad lo que tenemos que hacer es crear inicialmente al menos un componente específico para cada página de nuestra aplicación, para luego ir reconociendo interface/codigo que se reutiliza a partir del cual generaremos nuevos componentes.

* Vamos a crear un nuevo componente para nuestra página de inicio y para tener un mejor orden, crearemos una nueva carpeta denominada “components” (será hija de /src)
    * creamos el archivo /src/components/Inicio.js
        * copiamos el código desde App.js a Inicio.js, reemplazando el nombre de la funcion  "App" por "Inicio", con lo que el codigo nos quedaria asi:
        ```javascript
        function Inicio() {
            return (
             <div className="mt-4 p-5 rounded" style={{backgroundColor:"lightgray"}} >
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
                <button className="btn btn-lg btn-primary">
                    <i className="fa fa-search"> </i>
                    Ver Articulos Familias
                </button>
                </div>
            </div>
            );
        }
        export default Inicio;
        ```

       **Observe que siempre un componente de react debe inciar con mayusculas**

* Ahora modificamos el App.js para que muestre el componente Inicio, para lo cual reemplazamos su codigo con el siguiente:
    ```javascript
    import Inicio from './components/Inicio';
    function App() {
    return (
        <>
            <Inicio/>
        </>
    );
    }
    export default App;
    ```
* Ejecutemos la aplicaciones y verifiquemos los resultados obtenidos.

* En cualquier etapa de nuestro desarrollo, si quisieramos hacer el despliegue de nuestra aplicacion, debemos ejecutar el siguiente script desde la consola:
  * comando: npm run build

  **Observe que el comando genero una carpeta llamada "build" y varias subcarpetas, las cuales contienen los archivos minificadas necesarios para subir a nuestro servidor.**


## Etapa2
## Componente Articulos Familias
Ahora vamos a crear el segundo componente de nuestra aplicación que se llamará ArticulosFamilias y servirá para listar los datos de la tabla ArticulosFamilias, simplemente será una tabla html que nos mostrará los dos campos de la tabla ArticulosFamilias  

* Vamos a crear el componente ArticulosFamilias
  * en la carpeta components agregamos el archivo ArticulosFamilias.js
  * copiamos en ArticulosFamilias.js el siguiente codigo en donde definimos una tabla html en donde tenemos harcodeados 2 registros.
    ```javascript
    function ArticulosFamilias() {
      return (
        <>
          <div className="tituloPagina">Articulos Familias</div>
          <div>
             <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>IdArticuloFamilia</th>
                  <th style={{ width: "60%" }}>Nombre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Accesorios</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Audio</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      );
    }
    export default ArticulosFamilias;
    ```
    * En el codigo anterior se usa la clase css "tituloPagina" para destacar el titulo del componente, como la misma va a ser reutilizada por varios componentes, la vamos a definir dentro del archivo App.css, con el codigo que vemos a continuacion:
    ```javascript
    .tituloPagina {
      font-size: 1.75rem;
      font-weight: 500;
      color: white;
      text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
      border-bottom-style: solid;
      border-color: gray;
      border-bottom-width: thin;
      padding-bottom: 0.1em;
      margin-bottom: 0.5em;
    }
    ```
    **Observe:**
      * Que el archivo App.css ya existia, ya que fue creado al crear el proyecto con el comando "npx create-react-app ...", por lo que seguramente tenia codigo de ejemplo que debemos eliminar y solo dejar nuestro codigo.

  * Ahora modificamos el conponente App (archivo App.js) para que muestre el componente ArticulosFamilias, para lo cual necesitamos:
    1. Importar el archivo de estilo App.css
    2. Importar el codigo del componente ArticulosFamilias
    2. Modificar el retorno de nuestra funcion para que devuelva la etiqueta que representa al componente ArticulosFamilias 
    
    quedando como vemos a continuacion:
    ```javascript
      import "./App.css";
      import ArticulosFamilias from './components/ArticulosFamilias';
      function App() {
        return (
          <>
            <div className="divBody">
                <ArticulosFamilias/>
            </div>
          </>
        );
      }
      export default App;
    ```
  * En el codigo anterior se usa la clase css "divBody" para agregar algunos estilos al contenedor de los componentes, la vamos a definir dentro del archivo App.css, con el codigo que vemos a continuacion:
    ```javascript
    .divBody {
      background-color: white;
      min-height: 75vh;
      padding: 1rem;
    }
    body {
      background-color: rgb(241, 243, 247);
    }
    ```

  * Grabamos todos los cambios y desde el explorador comprobamos que se carga la página definida en el componente ArticulosFamilas

 
  
A continuacion vamos a crear un array con un conjunto de datos harcodeados que representaran los datos de ArticulosFamilias que queremos que se muestren dinamicamente en el componente que acabamos de crear; para lo cual crearemos en una carpeta llamada datos-mock un archivo llamado arrayArticuloFamili.js con el siguiente contenido

````javascript
const arrayArticuloFamili = [
    { IdArticuloFamilia: 1, Nombre: "Accesorios" },
    { IdArticuloFamilia: 2, Nombre: "Audio" },
    { IdArticuloFamilia: 3, Nombre: "Celulares" },
    { IdArticuloFamilia: 4, Nombre: "Cuidado Personal" },
    { IdArticuloFamilia: 5, Nombre: "Dvd" },
    { IdArticuloFamilia: 6, Nombre: "Fotografia" },
    { IdArticuloFamilia: 7, Nombre: "Frio-Calor" },
    { IdArticuloFamilia: 8, Nombre: "Gps" },
    { IdArticuloFamilia: 9, Nombre: "Informatica" },
]
export default arrayArticuloFamili;
````

A continuación vamos a modificar el componente artículos-familias para que desde su codigo se pueda acceder al array de ArticulosFamilias recién creados
Al inicio del archivo, Importamos el array arrayArticuloFamili:

````javascritp
import arrayArticuloFamili from '../datos-mock/articulosfamilias-mock';
````

Dentro del componente ArticuloFamilias agregamos:
  * una constante llamada "articulosFamilias" que contenga el array de articulosFamilias recien iportado que luego va ser recorrido (mediante la funcion map) en el html para generar la tabla 
  * y otra constante "tituloPagina" para mostrar arriba de la tabla:

````javascritp
function ArticulosFamilias() {
  const articulosFamilias = arrayArticuloFamili;
  const tituloPagina = 'ArticulosFamilias';
  
  return (
    //...
  )
}
````

Luego modificamos la respuesta html de nuestro componente ArticulosFamilias  para que muestre la propiedad Titulo y con ayuda de la funcion map  recorra el array Items y dibuje (pinte o rendererice) la tabla, el codigo completo de nuestro componente quedaria asi:

````javascript
import arrayArticuloFamili from '../datos-mock/articulosfamilias-mock';

function ArticulosFamilias() {
  const articulosFamilias = arrayArticuloFamili;
  const tituloPagina = 'ArticulosFamilias';

  return (
    <div>
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
    </div>
  );

}

export default ArticulosFamilias;
````

Ahora probamos los cambios realizado ejecutando la aplicación: 
  comando: npm run start

Observe:
  * la tecnica usada para renderizar condicionalmente el tbody de la tabla solo si existe la variable articulosFamilias.
  * la tecnica usada para transformar el array Items mediante la fucnion map y por cada item generar el tag tr correspondiente a la fila de la tabla.

Para mantener simple nuestro componente, es deseable que solo maneje la renderizacion de nuestra html y mediante servicios recibir/enviar  datos desde/hacia el servidor (o como hasta ahora mockeados). Para ir hacia ese concepto, seguidamente creamos un servicio que denominaremos ArticulosFamilias-mock-service.js, análogamente como hicimos anteriormente con los componenentes, lo haremos dentro de una carpeta “services” donde agrupamos los servicios de nuestra aplicación.

  * En el mismo crearemos 
    * un método “Buscar” que devuelva todos los registros del array ArticulosFamlias
    * un método "BuscarPorId" que devuelve el articulofamilia solicitado.
    * un metodo "Agregar" para dar de alta un registro
    * un metodo "Modificar" para modificar un registro
    * un metodo "Eliminar" para eliminar un registro 

  * Finalmente exportaremos la fucionalidad desarrollada

````javascript
import arrayArticuloFamilia from '../datos-mock/articulosfamilias-mock';

async function Buscar() {
     return arrayArticuloFamilia;
}

async function BuscarPorId(IdArticuloFamilia) {
      return arrayArticuloFamilia.find((articulofamilia) => articulofamilia);
}

async function Agregar(articuloFamilia) {
    articuloFamilia.IdArticuloFamilia = arrayArticuloFamilia.length + 1;  // simula autoincremental
    arrayArticuloFamilia.push(articuloFamilia);
}

async function Modificar(articuloFamilia) {
    let articuloFamiliaEncontrado = arrayArticuloFamilia.find((articulofamiliafind) => articulofamiliafind.IdArticuloFamilia === articuloFamilia.IdArticuloFamilia);
    if (articuloFamiliaEncontrado) {
        articuloFamiliaEncontrado.Nombre = articuloFamilia.Nombre;
    }
}

async function Eliminar(IdArticuloFamilia){
    let articuloFamiliaEncontrado = arrayArticuloFamilia.find((articulofamiliafind) => articulofamiliafind.IdArticuloFamilia === IdArticuloFamilia);
    if (articuloFamiliaEncontrado) {
        arrayArticuloFamilia.splice(arrayArticuloFamilia.indexOf(articuloFamiliaEncontrado), 1);
    }
}

export const articulosFamiliasMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};
````

Observe:
  * ya pensando en que nuestro servicio real interactura contra un servidor remoto mediante llamadas asincronas, hemos definido este mock lo mas parecido al cual esta imitando por lo que la funciones son asincronas.


Ahora modificamos el componente ArticulosFamilias para que consuma el nuevo servicio y recupere desde allí el array de ArticulosFamilias. Los cambios seran los siguientes:
  * dejaremos de usar directamente el arrayArticuloFamili sino que el mismo sera provisto por el servicio articulosFamiliasMockService
  * haremos uso del hook UseEffect para invocar este servicio al montarse por primera ves el componente.
  * hermos uso del hook UseState para mantener dentro del estado del componente los datos que nos devuelve el servicio.

El código  completo de ArticulosFamilias.jsx quedaría así:
````javascript
import React, {useState, useEffect} from 'react';
import { articulosFamiliasMockService } from '../services/articulosFamilias-mock-service';

function ArticulosFamilias() {
  const tituloPagina = 'ArticulosFamilias';
  const [articulosFamilias, setArticulosFamilias] = useState(null);
  
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarArticulosFamilas();
  }, []);
  
  async function BuscarArticulosFamilas() {
    let data = await articulosFamiliasMockService.get();
    setArticulosFamilias(data);
  };

  return (
    <div>
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
    </div>
  );

}

export default ArticulosFamilias;
````
* Observe:
  * dentro del hook useEffect no llamamos directamente al servicio porque al ser asincrono recibiriamos una advertencia del compilador.
  * el hook useEffect se ejecuta solo una vez al montar el componente debido a su dependencia vacia: [].


## Etapa3
## Componentes Menu y Footer
Para poder navegar entre las diferentes páginas de nuestra aplicación, hasta ahora representada por los componentes Inicio y ArticulosFamilias vamos a crear un nuevo componente llamado “Menu” que nos permitirá implementar dicha funcionalidad.

Inicialmente vamos a preparar a nuestra aplicacion para dicha funcionalidad, para lo cual importaremos el modulo de ruteo
 comando: npm i react-router-dom

  A continuacion modificaremos el html de nuestro componente App en donde, gracias a la funcionalidad del router, indicaremos que componente se mostrara segun la url que se indique en el explorador
  El codigo de nuestro componente app.js quedara asi:

  ````javascript
  import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
  import ArticulosFamilias from "./components/ArticulosFamilias";
  import Inicio from "./components/Inicio";
  function App() {
    return (
      <>
        <BrowserRouter>
          <div className="divBody">
              <Routes>
                <Route path="/Inicio" element={<Inicio />} />
                <Route path="/articulosfamilias" element={<ArticulosFamilias />} />
                <Route path="*" element={<Navigate to="/Inicio" replace />} />
              </Routes>
          </div>
        </BrowserRouter>
      </>
    );
  }
  export default App;
  ````

  Observe:
    * en la etiqueta Route la relacion entre la propiedad path y element
    * en la ultima etiqueta Route que luego de evaluarse secuenciamente todas las anteriores y de no encontrar coincicencia en el path, la redirige al path "/Inicio"

Ahora ya configurada nuestra aplicacion para interpretar la url del explorador, crearemos el componente menu que ofrecera la interface html para elegir las distintas pantallas (rutas/componentes) que ofrece nuestra aplicacion, creamos en la carpeta components el archivo Menu.jsx con el siguiente codigo:

````javascript
import "./App.css";
import React from "react";
import { NavLink, Link } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <a className="navbar-brand">
        <i className="fa fa-industry"></i>
        &nbsp;<i>Pymes</i>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/articulosfamilias">
              Articulos Familias
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export { Menu };
````

Finalmente modificamos nuevamente el html del app.js para renderizar el menu recien creado, este debe ir dentro de las etiquetas BrowserRouter...

````javascript
//...
<BrowserRouter>
  <Menu />
  <div className="divBody">
    <Routes>
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/articulosfamilias" element={<ArticulosFamilias />} />
      <Route path="*" element={<Navigate to="/Inicio" replace />} />
    </Routes>
  </div>
</BrowserRouter>
//...
````


## Etapa4
## Componente Articulos 1/2
  * Estructura basica:
    * componentes principal Articulos, con bocetos de funcionalidad del ABMC
      * buscar con filtro
      * buscar uno
      * grabar: alta y modificacion
      * activar-desactivar (baja logica)
    * componentes hijos: 
      * ArticulosBuscar
      * ArticulosListado 
      * ArticulosRegistro (consulta, alta y  modificacion)

  * Consumir el servicio articulosfamilias-service.js
  ### Componente ArticulosBuscar
  * Definir Servicio articulos-service
  * Funcionalidad Buscar con parametros (consumir servicio articulos-service)
  
  ### Componente ArticulosListado
  * paginacion en el servidor
  * implementar funcionalidad activar-desactivar

## Etapa5
## Componente Articulos 2/2
  ### Componente ArticulosRegistro
  * Formularios react-hook-form
  * implementar funcionalidad bucar uno  (consultar)
  
  * implementar funcionalidad grabar
  
  * Validaciones react-hook-form 

## Etapa6 

### ModalDialog: Alert, Confirm, BloquearPantalla
  modalDialog.service.js
  ModalDialog.jsx

### Interceptor axios: BloquearPantalla
  http.service.js
### Seguridad JWT
  auth.service.js
  Login.jsx