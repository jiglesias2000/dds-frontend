import axios from "axios";
import {config} from "../config";

const urlResource = config.urlResourceArticulos;

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdArticulo);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdArticulo);
}

async function Grabar(item) {
  if (item.IdArticulo === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdArticulo, item);
  }
}

export const articulosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};