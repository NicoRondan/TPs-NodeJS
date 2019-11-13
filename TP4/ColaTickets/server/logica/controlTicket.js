const fs = require('fs');
const { Queue } = require('./moduloCola');

class Ticket { //Clases en ES6
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}



class TicketControl  {
    constructor() {

        this.ultimo = 0;
        this.tickets = new Queue();
        this.ultimos4 = [];
        try {
            let data = require('../server/data/data.json');
            console.log(data); //se muestra el n° de ticket y los ultimos 4
        } catch {
            console.log('Aún no hay tickets disponibles');
        }

    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.enqueue(ticket) //se añade el ticket a la cola de tickets
        this.guardarArchivo();

        return `Ticket ${ this.ultimo }`;
    }


    atenderTicket(escritorio) {
        if (this.tickets.isEmpty()) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets.front().numero;
        this.tickets.dequeue(); // Se elimina el ticket a ser atendido

        let atenderTicket = new Ticket(numeroTicket, escritorio); // Ticket que se atiende

        this.ultimos4.unshift(atenderTicket); // Se agrega el ticket al inicio de los 4 ultimos

        if (this.ultimos4.length > 4) {
            this.ultimos4.pop(); // Borrar el último ticket atendido.
        }

        console.log('Ultimos 4', this.ultimos4);

        this.guardarArchivo();

        return atenderTicket;

    }


    guardarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData, null, 2);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }


}


module.exports = {
    TicketControl
}