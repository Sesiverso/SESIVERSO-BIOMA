const words = [
    "PLANICIE",   // Grande área plana com vegetação rasteira
    "NANDU",      // Ave grande que não voa
    "TUCO",       // Roedor pequeno encontrado nos Pampas
    "GRAMINHA",   // Tipo de grama resistente ao fogo
    "ARENOSO",    // Solo característico dos Pampas
    "PARANA",     // Rio importante que atravessa o bioma Pampas
    "PASTAGEM",   // Planta usada como pastagem no bioma
    "OMBU",       // Árvore típica dos Pampas
    "PAMPAS",     // Região onde o bioma Pampas é predominante
    "BARBASCO"    // Capim nativo utilizado na alimentação do gado
];

const correctWords = new Set(words);
const gridSize = 10;
let selectedCells = [];

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
    const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
    let startRow, startCol;

    switch(direction) {
        case 0: // Horizontal
            startRow = Math.floor(Math.random() * gridSize);
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
            }
            break;
        case 1: // Vertical
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * gridSize);
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol}']`);
                cell.textContent = word[i];
            }
            break;
        case 2: // Diagonal
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
            }
            break;
    }
}

function selectCell(cell) {
    if (!cell.classList.contains('selected')) {
        cell.classList.add('selected');
        selectedCells.push(cell);
    } else {
        cell.classList.remove('selected');
        selectedCells = selectedCells.filter(c => c !== cell);
    }
}

function checkWords() {
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');
    const result = document.getElementById('result');

    if (correctWords.has(selectedWord)) {
        result.textContent = `Parabéns! Você encontrou uma característica do bioma Pampas: ${selectedWord}!`;
    } else {
        result.textContent = 'Palavra incorreta. Tente novamente.';
    }
}

createGrid();
