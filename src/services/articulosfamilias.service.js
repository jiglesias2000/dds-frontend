import axios from "axios";

export const articulosfamiliasService = {
  getAll,
};

//const urlServidor = "https://pymes2021.azurewebsites.net"
//const urlServidor = "https://dds-express.azurewebsites.net"
const urlServidor = "http://localhost:3000";
const urlResource = urlServidor + "/api/articulosfamilias";

function getAll() {
  return axios.get(urlResource);
}
