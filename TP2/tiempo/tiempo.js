const axios = require('axios')

let getTiempo = async(lat, lon) => {

    let apikey = '5133e06ff2617085e5e05bccf763f53f&units=metric'
    let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)

    let temperatura = resp.data.main.temp
    let presion = resp.data.main.pressure
    let humedad = resp.data.main.humidity

    return { temperatura, presion, humedad }

}

module.exports = { getTiempo }
