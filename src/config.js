const urlServidor = "https://dds-express.azurewebsites.net"
//const urlServidor = "http://localhost:3000"
const urlResourceArticulos = urlServidor + "/api/articulos";
const urlResourceArticulosFamilias = urlServidor + "/api/articulosfamilias";
const urlResourceArticulosJWT = urlServidor + "/api/jwt/articulos";

export const config = {
    urlServidor,
    urlResourceArticulos,
    urlResourceArticulosFamilias,
    urlResourceArticulosJWT,
}
