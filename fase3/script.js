let board = null;
let game = new Chess();
const boardElement = document.getElementById('board');

const createBoard = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
            square.id = letters[j] + numbers[i];
            square.addEventListener('click', () => onSquareClick(square));
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

    let rowIndex = 0;
    for (const row of squares) {
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
        rowIndex++;
    }

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
        targetSquare.addEventListener('click', () => onMove(pieceSquare, move.to), { once: true });
    });
};

const onMove = (from, to) => {
    game.move({ from, to });
    updateBoard();
    setTimeout(makeRandomMove, 250);
};

const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    updateBoard();
};

const updateStatus = () => {
    let status = '';

    if (game.in_checkmate()) {
        status = 'Fim de jogo, xeque-mate!';
    } else if (game.in_draw()) {
        status = 'Fim de jogo, empate!';
    } else {
        status = `Jogador: ${game.turn() === 'w' ? 'Indígenas' : 'Portugueses'}`;
        if (game.in_check()) {
            status += ', xeque!';
        }
    }

    document.getElementById('status').textContent = status;
};

document.getElementById('reset-button').addEventListener('click', () => {
    game.reset();
    updateBoard();
    updateStatus();
});

createBoard();
updateBoard();
updateStatus();
