class Queue {
    // cola implementada con un array
    constructor()
    {
        this.items = [];
    }

    enqueue(element) {
    // agregar un elemento a la cola
        this.items.push(element);
    }
    dequeue() {
        // eliminar un elemento de la cola
        if(this.isEmpty())
            return "Cola vacía";
        return this.items.shift();
    }
    front() {
        // retorna el frente de la cola
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }
    isEmpty() {
        // return true si la cola está vacia.
        return this.items.length == 0;
    }
}

module.exports = {Queue};
