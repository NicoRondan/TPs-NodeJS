let empleados = [{
    id:1,
    nombre: 'Tito'
}, {
    id:2,
    nombre: 'Pedro'
}, {
    id:3,
    nombre: 'Juan'
}];

let salarios = [{
    id:1,
    salario: 3000
}, {
    id:2,
    salario: 4000
}];

let getEmpleado = (id) => {

    return new Promise((resolve, reject) => { //La promesa es una funcion que tiene dos callbacks: resolve y reject
    //El resolve, se llama si la promesa es exitosa, si logra encontrar un empleado.
    //El reject se llama si no es existe un empleado en la BBDD
    let empleadoDB = empleados.find(empleado => empleado.id === id )

    if (!empleadoDB) {
        reject(`No existe el empleado con el ID ${ id }`);
    }else {
        resolve(empleadoDB);
    }

    })
}

//1
getEmpleado(1).then(empleado => {
    console.log('El empleado de BD', empleado);
}, (err) => {
    console.log(err);
})

//2

let getSalario = (id) => {

    return new Promise((resolve, reject) => {

    let salarioDB = salarios.find(salario => salario.id === id)

    if (!salarioDB) {
        reject(`No existe el salario con el ID ${ id }`);
    }else {
        resolve(salarioDB);
    }

    })
}

getSalario(2).then(salario => {
    console.log('El salario de BD', salario);
}, (err) => {
    console.log(err);
})
