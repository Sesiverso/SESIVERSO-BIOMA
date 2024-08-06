let board = null;
let game = new Chess();

const onDragStart = (source, piece, position, orientation) => {
    if (game.in_checkmate() === true || game.in_draw() === true || piece.search(/^b/) !== -1) {
        return false;
    }
};

const makeRandomMove = () => {
    const possibleMoves = game.moves();
    
    if (possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    board.position(game.fen());

    window.setTimeout(makeRandomMove, 250);
};

const onDrop = (source, target) => {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // always promote to a queen for simplicity
    });

    if (move === null) return 'snapback';

    window.setTimeout(makeRandomMove, 250);
};

const onSnapEnd = () => {
    board.position(game.fen());
};

const cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

board = Chessboard('board', cfg);

document.getElementById('reset-button').addEventListener('click', () => {
    game.reset();
    board.start();
});
