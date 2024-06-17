//Stack: son una estructura de datos donde tenemos una colección de elementos, y sólo podemos hacer dos cosas: añadir un elemento al final de la pila. sacar el último elemento de la pila.
//Veremos la implementacion en typescript
// Clase Cola
var Cola = /** @class */ (function () {
    function Cola() {
        this.elementos = [];
    }
    Cola.prototype.enqueue = function (elemento) {
        this.elementos.push(elemento);
    };
    Cola.prototype.dequeue = function () {
        return this.elementos.shift();
    };
    Cola.prototype.frente = function () {
        return this.elementos[0];
    };
    Cola.prototype.estaVacia = function () {
        return this.elementos.length === 0;
    };
    Cola.prototype.tamaño = function () {
        return this.elementos.length;
    };
    return Cola;
}());
// Clase Pila
var Pila = /** @class */ (function () {
    function Pila() {
        this.elementos = [];
    }
    Pila.prototype.push = function (elemento) {
        this.elementos.push(elemento);
    };
    Pila.prototype.pop = function () {
        return this.elementos.pop();
    };
    Pila.prototype.tope = function () {
        return this.elementos[this.elementos.length - 1];
    };
    Pila.prototype.estaVacia = function () {
        return this.elementos.length === 0;
    };
    Pila.prototype.tamaño = function () {
        return this.elementos.length;
    };
    return Pila;
}());
// Ejemplo de uso de Cola
var cola = new Cola();
cola.enqueue("Elemento 1");
cola.enqueue("Elemento 2");
console.log(cola.dequeue()); // "Elemento 1"
console.log(cola.frente()); // "Elemento 2"
console.log(cola.estaVacia()); // false
console.log(cola.tamaño()); // 1
// Ejemplo de uso de Pila
var pila = new Pila();
pila.push(1);
pila.push(2);
console.log(pila.pop()); // 2
console.log(pila.tope()); // 1
console.log(pila.estaVacia()); // false
console.log(pila.tamaño()); // 1
