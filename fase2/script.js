const quizData = [
    {
        question: "Qual é a principal vegetação dos Pampas?",
        options: ["Floresta", "Campo", "Deserto", "Tundra"],
        answer: "Campo"
    },
    {
        question: "Os Pampas são encontrados em quais países?",
        options: ["Brasil e Argentina", "Brasil e Chile", "Argentina e Uruguai", "Uruguai e Brasil"],
        answer: "Brasil e Argentina"
    },
    {
        question: "Qual é um animal típico dos Pampas?",
        options: ["Onça", "Tigre", "Capivara", "Cervo"],
        answer: "Capivara"
    },
    {
        question: "Qual é a principal atividade econômica dos Pampas?",
        options: ["Pecuária", "Mineração", "Turismo", "Indústria"],
        answer: "Pecuária"
    }
];

function renderQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizData.forEach((quiz, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<h3>${quiz.question}</h3>`;

        quiz.options.forEach(option => {
            questionElement.innerHTML += `
                <label class="option">
                    <input type="radio" name="question${index}" value="${option}"> ${option}
                </label>
            `;
        });

        quizContainer.appendChild(questionElement);
    });
}

function submitAnswers() {
    const results = [];
    quizData.forEach((quiz, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        results.push(selectedOption ? selectedOption.value === quiz.answer : false);
    });

    displayResults(results);
}

function displayResults(results) {
    const resultElement = document.getElementById('result');
    const correctAnswers = results.filter(result => result).length;

    resultElement.innerHTML = `Você acertou ${correctAnswers} de ${quizData.length} perguntas.`;

    // Atualiza a página após 3 segundos
    setTimeout(() => {
        location.reload();
    }, 3000);
}

// Renderiza o quiz ao carregar a página
document.addEventListener('DOMContentLoaded', renderQuiz);
