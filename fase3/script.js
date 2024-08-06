const quizData = [
    {
        question: "Sou um bioma onde a vegetação é predominantemente de campos e pradarias, e é conhecido por ser uma região rica em diversidade animal e vegetal. Que bioma sou eu?",
        options: ["Caatinga", "Pampa", "Mata Atlântica", "Amazônia"],
        answer: 1 // Índice da resposta correta
    },
    {
        question: "Sou um bioma que abriga a maior floresta tropical do mundo, conhecida por sua biodiversidade. Que bioma sou eu?",
        options: ["Cerrado", "Pampa", "Amazônia", "Mata Atlântica"],
        answer: 2
    },
    {
        question: "Sou um bioma caracterizado por árvores de folhas largas e clima tropical, com grande quantidade de chuvas. Que bioma sou eu?",
        options: ["Mata Atlântica", "Deserto", "Cerrado", "Pampa"],
        answer: 0
    },
    {
        question: "Sou um bioma árido, onde as chuvas são escassas e a vegetação é adaptada ao clima seco. Que bioma sou eu?",
        options: ["Cerrado", "Deserto", "Pampa", "Amazônia"],
        answer: 1
    }
];

let currentQuestionIndex = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');

const loadQuestion = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
    });

    nextButton.style.display = 'none'; // Esconde o botão "Próxima Pergunta"
    resultElement.textContent = ''; // Limpa o resultado anterior
};

const checkAnswer = (selectedOption) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    const optionsButtons = document.querySelectorAll('.option');
    optionsButtons.forEach((button, index) => {
        if (index === correctAnswer) {
            button.classList.add('correct'); // Adiciona classe para resposta correta
        } else {
            button.classList.add('incorrect'); // Adiciona classe para resposta incorreta
        }
    });

    if (selectedOption === correctAnswer) {
        resultElement.textContent = 'Você acertou!';
    } else {
        resultElement.textContent = 'Você errou!';
    }

    nextButton.style.display = 'block'; // Mostra o botão "Próxima Pergunta"
};

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        questionElement.textContent = 'Quiz finalizado! Obrigado por jogar!';
        optionsElement.innerHTML = '';
        nextButton.style.display = 'none';
    }
};

loadQuestion();
