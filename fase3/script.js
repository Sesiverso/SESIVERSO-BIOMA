const words = [
    "ARACEA", "ARARA", "CIGANO", "ONCÇA", "MACACO",
    "ORQUÍDEA", "JACARANDÁ", "ÍRIS", "GUARÁ", "TATU"
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
        case 0: // Horizontal
            startRow = Math.floor(Math.random() * gridSize);
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
        case 1: // Vertical
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * gridSize);
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
            }
            break;
        case 2: // Diagonal
            startRow = Math.floor(Math.random() * (gridSize - word.length));
            startCol = Math.floor(Math.random() * (gridSize - word.length));
            for (let i = 0; i < word.length; i++) {
                const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol + i}']`);
                cell.textContent = word[i];
                cell.dataset.word = word;
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
        result.textContent = `Parabéns! Você encontrou uma característica da Mata Atlântica: ${selectedWord}!`;
        disableWordCells(selectedWord);
        foundWords.add(selectedWord);
        selectedCells = [];
    } else {
        result.textContent = 'Palavra incorreta. Tente novamente.';
    }
}

function disableWordCells(word) {
    const wordCells = Array.from(document.querySelectorAll(`.cell[data-word='${word}']`));
    
    // Remove 'selected' class from all cells before highlighting correct ones
    document.querySelectorAll('.cell.selected').forEach(cell => {
        cell.classList.remove('selected');
    });
    
    wordCells.forEach(cell => {
        cell.classList.add('found');
        cell.style.backgroundColor = '#28a745';
        cell.style.color = 'white';
        cell.style.pointerEvents = 'none'; // Disable clicking
    });

    // Also mark correctly selected cells
    selectedCells.forEach(cell => {
        if (wordCells.includes(cell)) {
            cell.classList.add('found');
            cell.style.backgroundColor = '#28a745';
            cell.style.color = 'white';
            cell.style.pointerEvents = 'none'; // Disable clicking
        }
    });
}

createGrid();



