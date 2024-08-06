document.addEventListener('DOMContentLoaded', function() {
    console.log('Caça-Palavras carregado.');

    const biomas = [
        ['P', 'A', 'M', 'P', 'A', 'S', 'A', 'R', 'O', 'S', 'O', 'C', 'E', 'R', 'R'],
        ['S', 'A', 'V', 'A', 'N', 'A', 'S', 'E', 'R', 'R', 'A', 'D', 'O', 'C', 'A'],
        ['C', 'A', 'A', 'T', 'I', 'N', 'G', 'A', 'A', 'M', 'A', 'Z', 'O', 'N', 'I'],
        ['C', 'E', 'R', 'R', 'A', 'D', 'O', 'P', 'A', 'M', 'P', 'A', 'S', 'A', 'N'],
        ['M', 'A', 'T', 'A', 'A', 'T', 'L', 'N', 'I', 'O', 'N', 'I', 'A', 'M', 'A'],
        ['C', 'A', 'T', 'I', 'N', 'G', 'A', 'S', 'A', 'M', 'A', 'T', 'A', 'A', 'T'],
        ['C', 'A', 'A', 'T', 'I', 'N', 'G', 'A', 'P', 'M', 'A', 'T', 'A', 'N', 'A'],
        ['M', 'A', 'Z', 'O', 'N', 'I', 'A', 'S', 'A', 'V', 'A', 'N', 'A', 'S', 'A'],
        ['S', 'A', 'M', 'A', 'T', 'A', 'A', 'T', 'L', 'N', 'I', 'O', 'N', 'I', 'A'],
        ['C', 'E', 'R', 'R', 'A', 'D', 'O', 'A', 'T', 'L', 'N', 'I', 'O', 'N', 'I'],
        ['C', 'E', 'R', 'R', 'A', 'D', 'O', 'A', 'M', 'A', 'T', 'A', 'A', 'T', 'L'],
        ['M', 'A', 'T', 'A', 'A', 'T', 'L', 'N', 'I', 'O', 'N', 'I', 'A', 'M', 'A'],
        ['C', 'E', 'R', 'R', 'A', 'D', 'O', 'A', 'M', 'A', 'T', 'A', 'A', 'T', 'L'],
        ['C', 'E', 'R', 'R', 'A', 'D', 'O', 'C', 'E', 'R', 'R', 'A', 'D', 'O', 'N']
    ];

    const respostaCorreta = 'PAMPA';

    function criarTabela() {
        const tabela = document.querySelector('#caca-palavras table');
        biomas.forEach((linha, i) => {
            const tr = document.createElement('tr');
            linha.forEach((letra, j) => {
                const td = document.createElement('td');
                td.textContent = letra;
                td.dataset.letra = letra;
                td.dataset.posicao = `${i}-${j}`;
                td.addEventListener('click', selecionarLetra);
                tr.appendChild(td);
            });
            tabela.appendChild(tr);
        });
    }

    let palavraAtual = '';
    const palavrasEncontradas = [];

    function selecionarLetra(event) {
        const td = event.target;
        td.classList.add('encontrado');
        palavraAtual += td.dataset.letra;
    }

    function verificarPalavras() {
        if (palavraAtual === respostaCorreta) {
            if (!palavrasEncontradas.includes(palavraAtual)) {
                palavrasEncontradas.push(palavraAtual);
            }
            document.getElementById('mensagem').textContent = 'Parabéns! Você encontrou o bioma: PAMPA!';
            document.getElementById('concluir').style.display = 'block'; // Exibir o botão de concluir
        } else {
            document.getElementById('mensagem').textContent = 'Palavra incorreta! Tente novamente.';
        }
        palavraAtual = '';
        desmarcarLetras();
    }

    function desmarcarLetras() {
        const tds = document.querySelectorAll('#caca-palavras td');
        tds.forEach(td => {
            td.classList.remove('encontrado');
        });
    }

    criarTabela();

    document.getElementById('verificar-palavras').addEventListener('click', verificarPalavras);
    
    // Lógica para redirecionar para a fase 2
    document.getElementById('concluir').addEventListener('click', function() {
        window.location.href = 'fase2/index.html'; // Altere o caminho conforme necessário
    });
});

