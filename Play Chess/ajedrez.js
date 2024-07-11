let arreglo = ["", "", ""];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var target = ev.target;

    if (target.tagName === "IMG") {
        target = target.parentNode;
    }

    var piece = document.getElementById(data);
    var sourceCell = piece.parentNode;
    var targetCellId = target.id;

    if (isValidMove(piece, sourceCell.id, targetCellId)) {
        if (target.hasChildNodes()) {
            var targetPiece = target.firstChild;
            var pieceColor = piece.id.includes("blanco") ? "blanco" : "negro";
            var targetPieceColor = targetPiece.id.includes("blanco") ? "blanco" : "negro";

            if (pieceColor !== targetPieceColor) {
                target.removeChild(targetPiece);
                target.appendChild(piece);
            } else {
                console.log("Movimiento inválido: No se puede comer una pieza del mismo color.");
                return;
            }
        } else {
            target.appendChild(piece);
        }
    }
}

function isValidMove(piece, sourceId, targetId) {
    var pieceId = piece.id;
    var pieceType = pieceId.split("_")[0];
    var sourceCoords = getCoordinatesFromId(sourceId);
    var targetCoords = getCoordinatesFromId(targetId);

    switch (pieceType) {
        case 'peon':
            if (pieceId.includes('blanco')) {
                return isValidPawnMove(sourceCoords, targetCoords, 'blanco');
            } else if (pieceId.includes('negro')) {
                return isValidPawnMove(sourceCoords, targetCoords, 'negro');
            }
            break;
        case 'torre':
            return isValidRookMove(sourceCoords, targetCoords);
        case 'caballo':
            return isValidKnightMove(sourceCoords, targetCoords);
        case 'alfil':
            return isValidBishopMove(sourceCoords, targetCoords);
        case 'reina':
            return isValidQueenMove(sourceCoords, targetCoords);
        case 'rey':
            return isValidKingMove(sourceCoords, targetCoords);
    }
    return false;
}

function getCoordinatesFromId(cellId) {
    var letter = cellId.charAt(0);
    var number = parseInt(cellId.charAt(1));
    return { letter: letter, number: number };
}

function isValidRookMove(source, target) {
    if (source.letter === target.letter || source.number === target.number) {
        return true;
    }
    return false;
}

function isValidKnightMove(source, target) {
    const diffLetter = Math.abs(source.letter.charCodeAt(0) - target.letter.charCodeAt(0));
    const diffNumber = Math.abs(source.number - target.number);
    return (diffLetter === 2 && diffNumber === 1) || (diffLetter === 1 && diffNumber === 2);
}

function isValidBishopMove(source, target) {
    const diffLetter = Math.abs(source.letter.charCodeAt(0) - target.letter.charCodeAt(0));
    const diffNumber = Math.abs(source.number - target.number);
    return diffLetter === diffNumber;
}

function isValidKingMove(source, target) {
    const diffLetter = Math.abs(source.letter.charCodeAt(0) - target.letter.charCodeAt(0));
    const diffNumber = Math.abs(source.number - target.number);
    const isOneStepMove = (diffLetter === 1 || diffLetter === 0) && (diffNumber === 1 || diffNumber === 0);
    const isNotSameCell = diffLetter !== 0 || diffNumber !== 0;
    return isOneStepMove && isNotSameCell;
}

function isValidQueenMove(source, target) {
    if (isValidBishopMove(source, target)) {
        return true;
    }
    const sameLetter = source.letter === target.letter;
    const sameNumber = source.number === target.number;
    const diffLetter = Math.abs(source.letter.charCodeAt(0) - target.letter.charCodeAt(0));
    const diffNumber = Math.abs(source.number - target.number);
    const isValidHorizontalVerticalMove = (sameLetter && diffNumber > 0) || (sameNumber && diffLetter > 0);
    return isValidHorizontalVerticalMove;
}

function isValidPawnMove(source, target, color) {
    const direction = (color === 'blanco') ? 1 : -1;

    if (source.letter === target.letter && target.number === source.number + direction) {
        return true;
    }

    if (source.letter === target.letter && source.number === (color === 'blanco' ? 2 : 7) && target.number === source.number + 2 * direction) {
        return true;
    }

    const isDiagonalMove = Math.abs(source.letter.charCodeAt(0) - target.letter.charCodeAt(0)) === 1 && target.number === source.number + direction;
    if (isDiagonalMove) {
        return true;
    }

    return false;
}

let celdas = {};

function inicializarCeldas() {
    const letras = 'ABCDEFGH';
    for (let fila = 1; fila <= 8; fila++) {
        for (let i = 0; i < letras.length; i++) {
            const columna = letras[i];
            const id = `${columna}${fila}`;
            celdas[id] = document.getElementById(id);
        }
    }
}

function PartidaInicial() {
    celdas["A1"].innerHTML = '<img src="imagenes/torre_blanca.png" id="torre_blanca_A1" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["B1"].innerHTML = '<img src="imagenes/caballo_blanco.png" id="caballo_blanco_B1" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["C1"].innerHTML = '<img src="imagenes/alfil_blanco.png" id="alfil_blanco_C1" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["D1"].innerHTML = '<img src="imagenes/reina_blanca.png" id="reina_blanca_D1" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["E1"].innerHTML = '<img src="imagenes/rey_blanco.png" id="rey_blanco_E1" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["F1"].innerHTML = '<img src="imagenes/alfil_blanco.png" id="alfil_blanco_F1" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["G1"].innerHTML = '<img src="imagenes/caballo_blanco.png" id="caballo_blanco_G1" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["H1"].innerHTML = '<img src="imagenes/torre_blanca.png" id="torre_blanca_H1" class="pieza" draggable="true" ondragstart="drag(event)">';

    for (let letra = 'A'.charCodeAt(0); letra <= 'H'.charCodeAt(0); letra++) {
        let id = String.fromCharCode(letra) + "2";
        celdas[id].innerHTML = `<img src="imagenes/peon_blanco.png" id="peon_blanco_${id}" class="pieza" draggable="true" ondragstart="drag(event)">`;
    }

    celdas["A8"].innerHTML = '<img src="imagenes/torre_negra.png" id="torre_negra_A8" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["B8"].innerHTML = '<img src="imagenes/caballo_negro.png" id="caballo_negro_B8" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["C8"].innerHTML = '<img src="imagenes/alfil_negro.png" id="alfil_negro_C8" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["D8"].innerHTML = '<img src="imagenes/reina_negra.png" id="reina_negra_D8" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["E8"].innerHTML = '<img src="imagenes/rey_negro.png" id="rey_negro_E8" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["F8"].innerHTML = '<img src="imagenes/alfil_negro.png" id="alfil_negro_F8" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["G8"].innerHTML = '<img src="imagenes/caballo_negro.png" id="caballo_negro_G8" class="pieza" draggable="true" ondragstart="drag(event)">';
    celdas["H8"].innerHTML = '<img src="imagenes/torre_negra.png" id="torre_negra_H8" class="pieza" draggable="true" ondragstart="drag(event)">';

    for (let letra = 'A'.charCodeAt(0); letra <= 'H'.charCodeAt(0); letra++) {
        let id = String.fromCharCode(letra) + "7";
        celdas[id].innerHTML = `<img src="imagenes/peon_negro.png" id="peon_negro_${id}" class="pieza" draggable="true" ondragstart="drag(event)">`;
    }
}


function reiniciar() {
    for (let fila = 1; fila <= 8; fila++) {
        for (let columna = 'A'.charCodeAt(0); columna <= 'H'.charCodeAt(0); columna++) {
            let id = `${String.fromCharCode(columna)}${fila}`;
            celdas[id].innerHTML = "";
        }
    }
    PartidaInicial();
}

document.addEventListener('DOMContentLoaded', (event) => {
    inicializarCeldas();
    PartidaInicial();
});