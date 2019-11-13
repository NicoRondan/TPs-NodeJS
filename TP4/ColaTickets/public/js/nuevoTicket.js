var socket = io();

var nuevoTicket = document.getElementById('lblNuevoTicket');  //se obtiene la etiqueta

//Comunicacion socket servidor
socket.on('connect', function(){
    console.log('Conectado con el servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(ticketControl){
    nuevoTicket.innerHTML = ticketControl.actual;   //se obtiene el ultimo ticket y se incrusta en el codigo html
})

function buttonClick(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        console.log(`El siguiente ticket es:  ${siguienteTicket} `);

        nuevoTicket.innerHTML = siguienteTicket;

    })
};
