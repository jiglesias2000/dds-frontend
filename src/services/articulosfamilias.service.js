import axios from 'axios';

export const articulosfamiliasService = {
  getAll,
};

function getAll() {
  return axios.get('https://pymes2021.azurewebsites.net/api/articulosfamilias');
}
