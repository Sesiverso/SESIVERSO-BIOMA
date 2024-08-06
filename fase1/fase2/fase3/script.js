const cardsArray = [
    { name: 'onca', img: 'imagens/onca.jpg' },
    { name: 'boto', img: 'imagens/boto.jpg' },
    { name: 'arara', img: 'imagens/arara.jpg' },
    { name: 'preguica', img: 'imagens/preguica.jpg' },
    { name: 'cobras', img: 'imagens/cobras.jpg' },
    { name: 'guarana', img: 'imagens/guarana.jpg' }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('memory-game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
    const { name, img } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const front = document.createElement('div');
    front.classList.add('card-front');

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card);
    card.appendChild(cardInner);
    cardInner.appendChild(front);
    cardInner.appendChild(back);
});

const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

grid.addEventListener('click', event => {
    const clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
});

function resetGame() {
    gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('match', 'selected');
        card.querySelector('.card-inner').style.transform = 'rotateY(0)';
    });
    setTimeout(() => {
        grid.innerHTML = '';
        gameGrid.forEach(item => {
            const { name, img } = item;

            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = name;

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const front = document.createElement('div');
            front.classList.add('card-front');

            const back = document.createElement('div');
            back.classList.add('card-back');
            back.style.backgroundImage = `url(${img})`;

            grid.appendChild(card);
            card.appendChild(cardInner);
            cardInner.appendChild(front);
            cardInner.appendChild(back);
        });
    }, 600);
}

document.addEventListener('DOMContentLoaded', () => {
    resetGame();
});
