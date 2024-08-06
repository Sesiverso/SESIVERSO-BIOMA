const biomas = ['Pampa', 'Amazônia', 'Cerrado', 'Caatinga'];
const palavrasErradas = ['Deserto', 'Montanha', 'Cidade', 'Lago', 'Mar'];
const todasAsPalavras = [...biomas, ...palavrasErradas];
const perguntas = {
    'Pampa': {
        texto: 'Qual é a principal característica do Pampa?',
        opcoes: ['Florestas densas', 'Grandes áreas de gramíneas', 'Desertos áridos'],
        respostaCorreta: 1
    },
    'Amazônia': {
        texto: 'Qual é a maior floresta tropical do mundo?',
        opcoes: ['Amazônia', 'Cerrado', 'Pampa'],
        respostaCorreta: 0
    },
    'Cerrado': {
        texto: 'Qual é a vegetação predominante do Cerrado?',
        opcoes: ['Florestas densas', 'Gramíneas e arbustos', 'Desertos'],
        respostaCorreta: 1
    },
    'Caatinga': {
        texto: 'Qual é um animal típico da Caatinga?',
        opcoes: ['Lobo-guará', 'Onça-pintada', 'Cervo-do-pantanal'],
        respostaCorreta: 0
    }
};

let acertos = 0;
let totalPalavras = 10;
let palavraAtual = '';

function iniciarJogo() {
    acertos = 0;
    document.getElementById('resultado').textContent = '';
    document.getElementById('palavras').innerHTML = '';
    document.getElementById('pergunta').style.display = 'none';
    adicionarPalavras();
}

function adicionarPalavras() {
    const palavrasContainer = document.getElementById('palavras');
    const palavrasSelecionadas = [];

    while (palavrasSelecionadas.length < totalPalavras) {
        const randomIndex = Math.floor(Math.random() * todasAsPalavras.length);
        const palavra = todasAsPalavras[randomIndex];

        if (!palavrasSelecionadas.includes(palavra)) {
            palavrasSelecionadas.push(palavra);
            const botao = document.createElement('button');
            botao.textContent = palavra;
            botao.onclick = () => verificarPalavra(palavra, botao);
            palavrasContainer.appendChild(botao);
        }
    }
}

function verificarPalavra(palavra, botao) {
    palavraAtual = palavra; // Armazena a palavra atual
    if (biomas.includes(palavra)) {
        acertos++;
        botao.classList.add('correct');
        mostrarPergunta(palavra); // Mostra a pergunta relacionada
    } else {
        botao.classList.add('incorrect');
    }
    botao.disabled = true; // Desabilitar botão após clique
    checarFimDoJogo();
}

function mostrarPergunta(palavra) {
    const perguntaElement = document.getElementById('texto-pergunta');
    const opcoesElement = document.getElementById('opcoes');
    const responderButton = document.getElementById('responder');

    perguntaElement.textContent = perguntas[palavra].texto;
    opcoesElement.innerHTML = '';
    perguntas[palavra].opcoes.forEach((opcao, index) => {
        const button = document.createElement('button');
        button.textContent = opcao;
        button.onclick = () => selecionarOpcao(index);
        opcoesElement.appendChild(button);
    });

    responderButton.style.display = 'block'; // Mostrar botão de responder
    document.getElementById('pergunta').style.display = 'block'; // Mostrar a seção de pergunta
}

function selecionarOpcao(index) {
    const respostaCorreta = perguntas[palavraAtual].respostaCorreta;
    if (index === respostaCorreta) {
        acertos++; // Incrementa acertos se a resposta estiver correta
    }
    document.getElementById('responder').disabled = false; // Habilitar botão de responder
}

function verificarResposta() {
    document.getElementById('pergunta').style.display = 'none'; // Esconder pergunta
    checarFimDoJogo();
}

function checarFimDoJogo() {
    const botoes = document.querySelectorAll('#palavras button');
    if (botoes.length === 0 || Array.from(botoes).every(botao => botao.disabled)) {
        mostrarResultado();
    }
}

function mostrarResultado() {
    const resultado = document.getElementById('resultado');
    resultado.textContent = `Você acertou ${acertos} de ${totalPalavras} palavras corretas!`;
    document.getElementById('reiniciar').style.display = 'block'; // Mostrar botão de reiniciar
}

function reiniciarJogo() {
    document.getElementById('reiniciar').style.display = 'none';
    iniciarJogo();
}

// Iniciar o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', iniciarJogo);
function adicionarPalavras() {
    const palavrasContainer = document.getElementById('palavras');
    const palavrasSelecionadas = [];

    while (palavrasSelecionadas.length < totalPalavras) {
        const randomIndex = Math.floor(Math.random() * todasAsPalavras.length);
        const palavra = todasAsPalavras[randomIndex];

        if (!palavrasSelecionadas.includes(palavra)) {
            palavrasSelecionadas.push(palavra);
            const botao = document.createElement('button');
            botao.textContent = palavra;
            botao.onclick = () => verificarPalavra(palavra, botao);
            palavrasContainer.appendChild(botao);
        }

        // Impede que o loop continue indefinidamente
        if (palavrasSelecionadas.length >= todasAsPalavras.length) {
            break; // Sai do loop se não houver mais palavras disponíveis
        }
    }
}
