import axios from "axios";
import {config} from "../config";

const urlResource = config.urlResourceArticulosFamilias;

async function buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}



export const articulosfamiliasService = {
  buscar
};