const lugar = require('./lugar/lugar');
const tiempo = require('./tiempo/tiempo');
const fs = require('fs');
const baseDatos = 'tiempo.json';

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener datos: ',
        demand: true
    }
}).argv


let getInfo = async(direccion) => {

    try{

        let coors = await lugar.getLugarLatitudLng(direccion)
        let clima = await tiempo.getTiempo(coors.latitud, coors.longitud)

        let objeto = {
                        localidad: {
                            nombre: coors.nombre,
                        },
                        tiempo: {
                            temperatura: clima.temperatura,
                            presion: clima.presion,
                            humedad: clima.humedad
                        }
                    }



        guardar(objeto);

        return `El clima en ${ coors.nombre} es de ${clima.temperatura} grados`;

    } catch (err) {
        return `No se pudo determinar el clima en ${ direccion }`;
    }


}


function guardar(info) {
    fs.exists(baseDatos, (existe) => {
        if (existe) {
            fs.readFile(baseDatos, 'utf-8', function(err, data) {
            if (err) throw err

            let arrayDeObjetos = JSON.parse(data)  //Extracción del archivo JSON
            arrayDeObjetos.datos.push(info)

            fs.writeFile(baseDatos, JSON.stringify(arrayDeObjetos, null, 2), 'utf-8', function(err) {  //Carga de datos
                if (err) throw err
                console.log('Hecho!');
            })
        })
        } else {
            array = {
                datos: [info]    //Creación del vector
            }
            fs.writeFile(baseDatos, JSON.stringify(array, null, 2), (err) => {
                if (err) throw err
                console.log('Hecho!');
            })
        }
    })
}




getInfo(argv.direccion)
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
