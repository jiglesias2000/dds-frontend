import axios from "axios";

const urlResource = "https://dds-express.azurewebsites.net/api/articulosfamilias";

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

export const articulosfamiliasService = {
  Buscar
};