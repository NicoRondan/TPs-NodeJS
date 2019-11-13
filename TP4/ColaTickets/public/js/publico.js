var socket = io();

//Comunicación socket servidor
socket.on('estadoActual', function(ticketControl) {
    gestionVisor(ticketControl.ultimos4);
});

socket.on('ultimos4', function(ticketControl) {   //se actualiza el sonido por cada ticket que se atiende

    var audio = new Audio('audio/new-ticket.mp3'); //reproducir sonido
    audio.play();

    gestionVisor(ticketControl.ultimos4);
});


function gestionVisor(ultimos4) {
    var j = 1;
    var lim = ultimos4.length - 1;
    for (var i = 0; i <= lim ; i++) {
        document.getElementById('lblTicket' + j).innerHTML = 'Ticket ' + ultimos4[i].numero;  // se insertan valores al codigo html
        document.getElementById('lblEscritorio' + j).innerHTML = 'Escritorio ' + ultimos4[i].escritorio;
        j++;
    }

}
