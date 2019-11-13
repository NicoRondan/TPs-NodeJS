var socket = io();

var parametros = new URLSearchParams(window.location.search); //se decodifican los argumentos en la url

if(!parametros.has('escritorio')){  //si no existe el escritorio en la url
    window.location = 'index.html';
    throw new Error('escritorio requerido');
}

var escritorio = parametros.get('escritorio');  //localiza el escritorio en la url
var ticketAtendido = document.getElementById('ticketAtendido');
console.log(escritorio);
document.getElementById('h1').innerHTML = `Escritorio ${escritorio}`;

function pasarTicket(){
    socket.emit('atenderTicket', {
        escritorio: escritorio //enviar n° de escritorio
    }, function(resp){
        console.log(resp);
        if(!resp.numero){   //si no hay más tickets
            ticketAtendido.innerHTML = resp;
        }else{              //si hay tickets en la cola
            ticketAtendido.innerHTML = `Ticket  ${resp.numero}`;
        }
    });
};

socket.on('connect', function(){
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
});
