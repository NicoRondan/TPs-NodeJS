let getUsuarioById = (id, callback) => {
    let usuario = {
        nombre: "Ernesto",
        id
    }

    if (id === 20) {
        callback(`El usuario con id ${id}, no existe en la Base de datos`);
    }else {
        callback(null, usuario);
    }
}

getUsuarioById(8, (err, usuario) => {

    if (err) {
        return console.log(err);
    }

    console.log('Usuario de base de datos', usuario);
});

//Al modificar el valor del id, si este no es igual que 20 la excepcion del error (en caso de que sea 20) no aparece y se muestra la informacion del usuario.
