const { io } = require('../server');
const { TicketControl } = require('../logica/controlTicket');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log(`Usuario ${client.id} conectado`);

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio requerido'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket); //se devuelve el ticket a ser atendido

        // notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('disconnect', () => {
        console.log(`Usuario ${client.id} desconectado`);
    });


});