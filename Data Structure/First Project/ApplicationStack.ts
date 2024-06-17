//Stack: son una estructura de datos donde tenemos una colección de elementos, y sólo podemos hacer dos cosas: añadir un elemento al final de la pila. sacar el último elemento de la pila.

//Veremos la implementacion en typescript

// Clase Cola
class Cola<T> {
    private elementos: Array<T> = [];

    enqueue(elemento: T): void {
        this.elementos.push(elemento);
    }

    dequeue(): T | undefined {
        return this.elementos.shift();
    }

    frente(): T | undefined {
        return this.elementos[0];
    }

    estaVacia(): boolean {
        return this.elementos.length === 0;
    }

    tamaño(): number {
        return this.elementos.length;
    }
}

// Clase Pila
class Pila<T> {
    private elementos: Array<T> = [];

    push(elemento: T): void {
        this.elementos.push(elemento);
    }

    pop(): T | undefined {
        return this.elementos.pop();
    }

    tope(): T | undefined {
        return this.elementos[this.elementos.length - 1];
    }

    estaVacia(): boolean {
        return this.elementos.length === 0;
    }

    tamaño(): number {
        return this.elementos.length;
    }
}

// Ejemplo de uso de Cola
const cola = new Cola<string>();
cola.enqueue("Elemento 1");
cola.enqueue("Elemento 2");
console.log(cola.dequeue()); // "Elemento 1"
console.log(cola.frente()); // "Elemento 2"
console.log(cola.estaVacia()); // false
console.log(cola.tamaño()); // 1

// Ejemplo de uso de Pila
const pila = new Pila<number>();
pila.push(1);
pila.push(2);
console.log(pila.pop()); // 2
console.log(pila.tope()); // 1
console.log(pila.estaVacia()); // false
console.log(pila.tamaño()); // 1