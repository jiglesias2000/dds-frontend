import arrayArticuloFamilia from '../datos-mock/articulosfamilias-mock';

async function get(IdArticuloFamilia) {
   if (IdArticuloFamilia) {
      return arrayArticuloFamilia.find((articulofamilia) => articulofamilia.IdArticuloFamilia === IdArticuloFamilia);
    } else {    
    return arrayArticuloFamilia;
    }
}

async function post(articuloFamilia) {
    articuloFamilia.IdArticuloFamilia = arrayArticuloFamilia.length + 1;  // simula autoincremental
    arrayArticuloFamilia.push(articuloFamilia);
}

async function put(articuloFamilia) {
    let articuloFamiliaEncontrado = arrayArticuloFamilia.find((articulofamiliafind) => articulofamiliafind.IdArticuloFamilia === articuloFamilia.IdArticuloFamilia);
    if (articuloFamiliaEncontrado) {
        articuloFamiliaEncontrado.Nombre = articuloFamilia.Nombre;
    }
}

// delete es palabra reservada de javascript, renombramos a remove
async function remove(IdArticuloFamilia){
    let articuloFamiliaEncontrado = arrayArticuloFamilia.find((articulofamiliafind) => articulofamiliafind.IdArticuloFamilia === IdArticuloFamilia);
    if (articuloFamiliaEncontrado) {
        arrayArticuloFamilia.splice(arrayArticuloFamilia.indexOf(articuloFamiliaEncontrado), 1);
    }
}

export const articulosFamiliasMockService = {
    get, post, put, remove
};

