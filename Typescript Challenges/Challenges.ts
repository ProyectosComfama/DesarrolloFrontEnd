// Método 35: Dibuja una espiral en una matriz de tamaño dado
function dibujarEspiral(tamano: number): string[] {
    // Crear una matriz vacía de tamaño dado
    const matriz = Array.from({ length: tamano }, () => Array(tamano).fill(' '));

    // Inicializar las coordenadas y direcciones
    let x = 0, y = 0, dx = 1, dy = 0;
    const simbolos = { horizontal: '═', vertical: '║', esquina: ['╗', '╝', '╚', '╔'] };
    let esquinaIndex = 0;

    // Iterar sobre cada celda de la matriz
    for (let i = 0; i < tamano * tamano; i++) {
        // Asignar el símbolo correspondiente según la dirección
        if (dx === 1 || dx === -1) {
            matriz[y][x] = simbolos.horizontal;
        } else if (dy === 1 || dy === -1) {
            matriz[y][x] = simbolos.vertical;
        }

        // Verificar si es necesario cambiar de dirección
        if (x + dx === tamano || x + dx < 0 || y + dy === tamano || y + dy < 0 || matriz[y + dy][x + dx] !== ' ') {
            matriz[y][x] = simbolos.esquina[esquinaIndex];
            esquinaIndex = (esquinaIndex + 1) % 4;
            [dx, dy] = [dy, -dx];
        }

        // Mover a la siguiente celda
        x += dx;
        y += dy;
    }

    // Convertir la matriz a un array de strings
    return matriz.map(row => row.join(''));
}

console.log(dibujarEspiral(5).join('\n'));

// Método 36: Realiza una cuenta atrás desde un número dado con un intervalo en segundos
function cuentaAtras(inicio: number, intervalo: number): void {
    // Validar los parámetros de entrada
    if (inicio < 0 || intervalo <= 0) {
        console.log("Los parámetros deben ser enteros positivos.");
        return;
    }

    // Función recursiva para la cuenta atrás
    const countdown = (num: number) => {
        if (num < 0) return;
        console.log(num);
        setTimeout(() => countdown(num - 1), intervalo * 1000);
    };

    // Iniciar la cuenta atrás
    countdown(inicio);
}

cuentaAtras(10, 1);

// Método 37: Verifica si una expresión matemática es válida
function esExpresionMatematicaValida(expresion: string): boolean {
    // Expresión regular para validar la expresión matemática
    const regex = /^-?\d+(\.\d+)?(\s+[-+*/%]\s+-?\d+(\.\d+)?)*$/;
    return regex.test(expresion.trim());
}

console.log(esExpresionMatematicaValida("5 + 6 / 7 - 4"));
console.log(esExpresionMatematicaValida("5 a 6"));

// Método 38: Convierte un ábaco a un número
function leerAbaco(abaco: string[]): number {
    // Reducir el ábaco a un número
    return abaco.reduce((acc, val, idx) => {
        const cuentas = val.split('---')[0].length;
        return acc + cuentas * Math.pow(10, abaco.length - idx - 1);
    }, 0);
}

const abaco = [
    "O---OOOOOOOO",
    "OOO---OOOOOO",
    "---OOOOOOOOO",
    "OO---OOOOOOO",
    "OOOOOOO---OO",
    "OOOOOOOOO---",
    "---OOOOOOOOO"
];

console.log(leerAbaco(abaco));

// Método 39: Convierte un nombre de columna de Excel a un número
function columnaExcel(nombre: string): number {
    let numero = 0;
    for (let i = 0; i < nombre.length; i++) {
        numero = numero * 26 + (nombre.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return numero;
}

console.log(columnaExcel("A"));
console.log(columnaExcel("Z"));
console.log(columnaExcel("AA"));
console.log(columnaExcel("CA"));

// Método 40: Evalúa una expresión en notación polaca inversa (RPN)
function evaluarRPN(expresion: string): number {
    const stack: number[] = [];
    const tokens = expresion.split(' ');

    for (const token of tokens) {
        if (!isNaN(Number(token))) {
            stack.push(Number(token));
        } else {
            const b = stack.pop()!;
            const a = stack.pop()!;
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(b === 0 ? Infinity : a / b);
                    break;
            }
        }
    }
    return stack.pop()!;
}

// Método 41: Convierte una fecha a formato romano
function fechaRomana(fecha: string): string {
    const romanos: { [key: number]: string } = {
        1: 'I', 4: 'IV', 5: 'V', 9: 'IX', 10: 'X', 40: 'XL', 50: 'L', 90: 'XC', 100: 'C', 400: 'CD', 500: 'D', 900: 'CM', 1000: 'M'
    };

    function convertirARomano(num: number): string {
        let resultado = '';
        const valores = Object.keys(romanos).map(Number).sort((a, b) => b - a);
        for (const valor of valores) {
            while (num >= valor) {
                resultado += romanos[valor];
                num -= valor;
            }
        }
        return resultado;
    }

    const [dia, mes, año] = fecha.split('-').map(Number);
    return `${convertirARomano(dia)}-${convertirARomano(mes)}-${convertirARomano(año)}`;
}

// Método 42: Cruza dos matrices y genera una nueva matriz con ciertos patrones
function cruzarMatrices(A: number[][], B: number[][]): string[][] {
    const resultado: string[][] = [];
    for (let i = 0; i < A.length; i++) {
        const fila: string[] = [];
        for (let j = 0; j < A[i].length; j++) {
            if (A[i][j] % 2 !== 0 && B[i][j] % 2 === 0) {
                fila.push('X');
            } else if ((A[i][j] % 2 === 0 && B[i][j] % 2 === 0) || (A[i][j] % 2 !== 0 && B[i][j] % 2 !== 0)) {
                fila.push('O');
            } else {
                fila.push('-');
            }
        }
        resultado.push(fila);
    }
    return resultado;
}

// Método 43: Comprime una cadena usando la cuenta de caracteres consecutivos
function comprimirCadena(cadena: string): string {
    let resultado = '';
    let contador = 1;

    for (let i = 0; i < cadena.length; i++) {
        if (cadena[i] === cadena[i + 1]) {
            contador++;
        } else {
            resultado += cadena[i] + contador;
            contador = 1;
        }
    }
    return resultado;
}

// Método 44: Verifica si es posible enlazar todas las palabras de una lista
function enlazarPalabras(palabras: string[]): boolean {
    function puedeEnlazar(palabra: string, restantes: string[]): boolean {
        if (restantes.length === 0) return true;
        for (let i = 0; i < restantes.length; i++) {
            if (palabra[palabra.length - 1] === restantes[i][0]) {
                const nuevasRestantes = restantes.slice(0, i).concat(restantes.slice(i + 1));
                if (puedeEnlazar(restantes[i], nuevasRestantes)) return true;
            }
        }
        return false;
    }

    for (let i = 0; i < palabras.length; i++) {
        const restantes = palabras.slice(0, i).concat(palabras.slice(i + 1));
        if (puedeEnlazar(palabras[i], restantes)) return true;
    }
    return false;
}

// Método 45: Busca secuencias de números que sumen un objetivo dado
function buscarSecuencias(numeros: number[], objetivo: number): number[][] {
    const resultado: number[][] = [];

    for (let i = 0; i < numeros.length; i++) {
        let suma = 0;
        const secuencia: number[] = [];
        for (let j = i; j < numeros.length; j++) {
            suma += numeros[j];
            secuencia.push(numeros[j]);
            if (suma === objetivo) {
                resultado.push([...secuencia]);
                break;
            }
        }
    }
    return resultado;
}