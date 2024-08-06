const perguntas = [
    {
        pergunta: "Qual é a principal característica do Pampa?",
        opcoes: ["Florestas densas", "Grandes áreas de gramíneas", "Desertos áridos"],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual é a maior floresta tropical do mundo?",
        opcoes: ["Amazônia", "Cerrado", "Pampa"],
        respostaCorreta: 0
    },
    {
        pergunta: "Qual é a vegetação predominante do Cerrado?",
        opcoes: ["Florestas densas", "Gramíneas e arbustos", "Desertos"],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual é um animal típico da Caatinga?",
        opcoes: ["Lobo-guará", "Onça-pintada", "Cervo-do-pantanal"],
        respostaCorreta: 0
    }
];

function carregarPerguntas() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    perguntas.forEach((pergunta, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = pergunta.pergunta;
        questionDiv.appendChild(questionTitle);
        pergunta.opcoes.forEach((opcao, opcaoIndex) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `pergunta${index}`;
            input.value = opcaoIndex;
            label.appendChild(input);
            label.appendChild(document.createTextNode(opcao));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });
        container.appendChild(questionDiv);
    });
}

function submitQuiz() {
    let acertos = 0;
    perguntas.forEach((pergunta, index) => {
        const selectedOption = document.querySelector(`input[name="pergunta${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === pergunta.respostaCorreta) {
            acertos++;
        }
    });
    document.getElementById('result').textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas!`;
}

document.addEventListener('DOMContentLoaded', carregarPerguntas);

