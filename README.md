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
        3. Que se incluye el repositorio de git del proyecto

* Para verificar la funcionalidad la plantilla inicial del proyecto recién creado, nos ubicamos dentro de dicha carpeta y podemos ejecutarlo y abrirlo en el explorador con el siguiente comando de consola: 
    * comando: npm run start
    
    * Observe:
      1. El comando anterior abrira el explorador por defecto en la url localhost:3000 y mostrara el proyecto en ejecucion.
      2. Podemos detener nuestro servidor de aplicacion node/react, estando ubicados en la ventana desde donde iniciamos el proyecto y pulsando Ctrl+C o cerrando la misma.
      3. Si cerramos el explorador y no detuvimos la aplicacion (punto anterior), nuestra aplicacion seguira ejecutandose y podemos volver a verla en el explorador con la url localhost:3000


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
    <div className="divBody m-4">
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

Observe: que hemos usado clases de bootstrap e iconos en nuestro html, por lo cual necesitaremos dichas librerias. (La clase "divBody" sera definida mas adelante)

* Agregamos al proyecto las librerias de Bootstrap (version 4.6) y sus dependencias 
    * npm install jquery popper.js bootstrap@4.6

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

Hasta aquí hemos usado el componente principal de la aplicación: App.js para nuestra página de inicio, pero en realidad lo que tenemosque hacer es crear inicialmente al menos un componente específico para cada página de nuestra aplicación, para luego ir reconociendo interface/codigo que se reutiliza a partir del cual generaremos nuevos componentes.

* Vamos a crear un nuevo componente para nuestra página de inicio y para tener un mejor orden, crearemos una nueva carpeta denominada “components” (será hija de dds-react/src)
    * creamos el archivo /src/components/Inicio.js
        * copiamos el código desde App.js a Inicio.js, reemplazando el nombre de la funcion  "App" por "Inicio", con los que nos quedaria asi:
        ```javascript
        function Inicio() {
            return (
            <div className="divBody m-4">
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

       **Observe que siempre una function-component de react debe inciar con mayusculas**

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
    * En el codigo anterior se usa la clase "tituloPagina" para destacar el titulo del componente, como la misma va a ser reutilizada por varios componentes, la vamos a definir dentro del archivo App.css, con el codigo que vemos a continuacion:
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

  * Ahora modificamos el conponente App para que muestre el componente ArticulosFamilias, para lo cual necesitamos:
    1. Importa el archivo de estilo App.css
    2. Importar el codigo del componente ArticulosFamilias
    2. Modificar el retorno de nuestra funcion para que devuelva la etiqueta que representa al componente ArticulosFamilias 
    
    quedando como vemos a continuacion:
    ```javascript
      import "./App.css";
      import Inicio from './components/ArticulosFamilias';
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
  * En el codigo anterior se usa la clase "divBody" para agregar algunos estilos al contenedor de los componentes, la vamos a definir dentro del archivo App.css, con el codigo que vemos a continuacion:
    ```javascript
    .divBody {
      background-color: white;
      min-height: 75vh;
      padding: 1rem;
    }
    ```

  * Grabamos todos los cambios y desde el explorador comprobamos que se carga la página definida en el componente ArticulosFamilas

