const cards = [
    { name: 'onca', img: 'images/onca.png' },
    { name: 'tucano', img: 'images/tucano.png' },
    { name: 'macaco', img: 'images/macaco.png' },
    { name: 'arara', img: 'images/arara.png' },
    { name: 'jacare', img: 'images/jacare.png' }
];

let cardArray = [...cards, ...cards];
cardArray.sort(() => 0.5 - Math.random());

const grid = document.getElementById('memory-game');
let firstCard = '';
let secondCard = '';
let lockBoard = false;

function createBoard() {
    cardArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">
                    <img src="${card.img}" alt="${card.name}">
                </div>
            </div>
        `;
        grid.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
    grid.innerHTML = '';
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
}

function revealAndShuffle() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.add('flipped');
    });

    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove('flipped');
        });

        cardArray.sort(() => 0.5 - Math.random());
        grid.innerHTML = '';

        cardArray.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;
            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">?</div>
                    <div class="card-back">
                        <img src="${card.img}" alt="${card.name}">
                    </div>
                </div>
            `;
            cardElement.addEventListener('click', flipCard);
            grid.appendChild(cardElement);
        });
    }, 3000);
}

createBoard();
revealAndShuffle();
