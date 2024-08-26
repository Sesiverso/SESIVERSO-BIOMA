const words = [
    "PLANICIE", "NANDU", "TUCO", "GRAMINHA", "ARENOSO",
    "PARANA", "PASTAGEM", "OMBU", "PAMPAS", "BARBASCO"
];

const correctWords = new Set(words);
const gridSize = 10;
let selectedCells = [];
let foundWords = new Set();

const wordsearch = document.getElementById('wordsearch');

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => selectCell(cell));
            wordsearch.appendChild(cell);
        }
    }
    fillGrid();
}

function fillGrid() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    document.querySelectorAll('.cell').forEach(cell => {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        cell.textContent = randomLetter;
    });

    words.forEach(word => {
        placeWordInGrid(word);
    });
}

function placeWordInGrid(word) {
    const direction = Math.floor(Math.random() * 3);
    let startRow, startCol;

    switch(direction) {
  
