import {config} from "../config";
import httpService from "./http.service";

const urlResource = config.urlResourceArticulosJWT;

async function Buscar(Nombre, Activo, Pagina) {
  //const resp = await axios.get(urlResource, {
const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

export const articulosJWTService = {
  Buscar
};