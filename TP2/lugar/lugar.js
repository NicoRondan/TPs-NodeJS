const axios = require('axios')

let getLugarLatitudLng = async(localidad) => {


    let rapidAPI = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${localidad}`,
        headers: {
            "x-rapidapi-key": "ce15ac61b3mshd262e621fd75e5ep19bb4bjsn3634fe4da3cf"
        }
    })

    let resp = await rapidAPI.get()

    if (resp.data.Results.lenght === 0) {
        throw new Error(`No hay resultados para ${localidad}.`)
    }

    let datos = resp.data.Results[0]
    let nombre = datos.name
    let latitud = datos.lat
    let longitud = datos.lon

    return {
        nombre,
        latitud,
        longitud
    }
}

module.exports = { getLugarLatitudLng }
