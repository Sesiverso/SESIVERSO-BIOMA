const quizData = [
    {
        question: "Sou um bioma onde a vegetação é predominantemente de campos e pradarias, e sou conhecido por ser uma região rica em diversidade animal e vegetal. Que bioma sou eu?",
        answer: "pampa" // Resposta correta
    },
    {
        question: "Sou um bioma caracterizado por árvores de folhas largas e clima tropical, com grande quantidade de chuvas. Que bioma sou eu?",
        answer: "mata atlântica"
    },
    {
        question: "Sou um bioma árido, onde as chuvas são escassas e a vegetação é adaptada ao clima seco. Que bioma sou eu?",
        answer: "deserto"
    }
];

let currentQuestionIndex = 0;

const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const checkButton = document.getElementById('check-button');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');

const loadQuestion = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answerInput.value = ''; // Limpa a caixa de resposta
    nextButton.style.display = 'none'; // Esconde o botão "Próxima Pergunta"
    resultElement.textContent = ''; // Limpa o resultado anterior
};

// Função para verificar a charada sobre a Amazônia
const checkRiddleAnswer = () => {
    const riddleAnswer = "amazônia";
    const userAnswer = answerInput.value.trim().toLowerCase();

    if (userAnswer === riddleAnswer) {
        alert('Você acertou a charada! Você será redirecionado para a fase 4.');
        window.location.href = 'fase4.html'; // Altere para o nome do arquivo da fase 4
    } else {
        alert('Resposta incorreta. Tente novamente!');
    }
};

// Função para verificar a resposta do quiz
const checkAnswer = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    const userAnswer = answerInput.value.trim().toLowerCase();

    if (userAnswer === currentQuestion.answer) {
        resultElement.textContent = 'Você acertou!';
        resultElement.className = 'correct';
        nextButton.style.display = 'block'; // Mostra o botão "Próxima Pergunta"
    } else {
        resultElement.textContent = 'Você errou! A resposta correta é: ' + currentQuestion.answer;
        resultElement.className = 'incorrect';
        nextButton.style.display = 'none'; // Esconde o botão "Próxima Pergunta"
    }
};

checkButton.onclick = () => {
    if (currentQuestionIndex === 0) {
        checkRiddleAnswer(); // Verifica a charada da Amazônia
    } else {
        checkAnswer(); // Verifica as respostas do quiz
    }
};

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        questionElement.textContent = 'Quiz finalizado! Obrigado por jogar!';
        answerInput.style.display = 'none'; // Esconde a caixa de resposta
        checkButton.style.display = 'none'; // Esconde o botão "Verificar Resposta"
        nextButton.style.display = 'none'; // Esconde o botão "Próxima Pergunta"
    }
};

loadQuestion();
