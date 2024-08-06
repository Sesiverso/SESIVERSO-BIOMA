let board = null;
let game = new Chess();
const boardElement = document.getElementById('board');

const createBoard = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
            square.id = letters[j] + numbers[i];
            boardElement.appendChild(square);
        }
    }
};

const updateBoard = () => {
    const position = game.fen().split(' ')[0];
    const squares = position.split('/');
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    boardElement.querySelectorAll('.square').forEach(square => {
        square.innerHTML = '';
    });

    squares.forEach((row, rowIndex) => {
        let columnIndex = 0;

        for (const char of row) {
            if (!isNaN(char)) {
                columnIndex += parseInt(char);
            } else {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                piece.textContent = char;
                piece.id = letters[columnIndex] + (8 - rowIndex);
                document.getElementById(letters[columnIndex] + (8 - rowIndex)).appendChild(piece);
                columnIndex++;
            }
        }
    });

    addPieceEventListeners();
};

const addPieceEventListeners = () => {
    document.querySelectorAll('.piece').forEach(piece => {
        piece.addEventListener('click', onPieceClick);
    });
};

const onPieceClick = event => {
    const piece = event.target;
    const pieceSquare = piece.parentElement.id;

    const moves = game.moves({ square: pieceSquare, verbose: true });
    if (moves.length === 0) return;

    document.querySelectorAll('.highlight').forEach(square => {
        square.classList.remove('highlight');
    });

    moves.forEach(move => {
        const targetSquare = document.getElementById(move.to);
        targetSquare.classList.add('highlight');
        targetSquare.addEventListener('click', onSquareClick.bind(null, pieceSquare, move.to), { once: true });
    });
};

const onSquar
