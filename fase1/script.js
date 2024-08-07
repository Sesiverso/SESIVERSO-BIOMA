const words = ["PAMPA", "AMAZONIA", "CERRADO", "CAATINGA", "PANTANAL"];
const correctWord = "PAMPA";
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
    const direction = Math.random() < 0.5; // true para horizontal, false para vertical
    const maxStartIndex = gridSize - word.length;
    let startRow, startCol;

    if (direction) {
        startRow = Math.floor(Math.random() * gridSize);
        startCol = Math.floor(Math.random() * (gridSize - word.length));
        for (let i = 0; i < word.length; i++) {
            const cell = document.querySelector(`.cell[data-row='${startRow}'][data-col='${startCol + i}']`);
            cell.textContent = word[i];
        }
    } else {
        startRow = Math.floor(Math.random() * (gridSize - word.length));
        startCol = Math.floor(Math.random() * gridSize);
        for (let i = 0; i < word.length; i++) {
            const cell = document.querySelector(`.cell[data-row='${startRow + i}'][data-col='${startCol}']`);
            cell.textContent = word[i];
        }
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

    if (selectedWord === correctWord) {
        result.textContent = 'Parabéns! Você encontrou o bioma correto: Pampa!';
        const redirect = confirm('Você encontrou o bioma correto! Clique OK para ir para a próxima fase.');
        if (redirect) {
            window.location.href = 'fase2/index.html';
        }
    } else {
        result.textContent = 'Palavra incorreta. Tente novamente.';
    }
}

createGrid();


