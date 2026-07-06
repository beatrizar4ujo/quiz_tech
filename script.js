// Captura os elementos do HTML que serão manipulados pelo JavaScript
const btnIniciar = document.getElementById("btnIniciar");
const inicio = document.getElementById("inicio");
const quiz = document.getElementById("quiz");

const pergunta = document.getElementById("pergunta");
const respostas = document.getElementById("respostas");

const btnProxima = document.getElementById("proxima");

const resultado = document.getElementById("resultado");
const pontuacaoTexto = document.getElementById("pontuacao");

// Elementos responsáveis pela troca de tema
const temaBtn = document.getElementById("temaBtn");
const iconeTema = temaBtn.querySelector("i");

// Variáveis de controle do quiz
let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;

// Mantém o tema escolhido mesmo após atualizar a página
if(localStorage.getItem("tema") === "dark"){

    document.body.classList.add("dark");

    iconeTema.classList.remove("fa-moon");
    iconeTema.classList.add("fa-sun");

}

// Carrega as perguntas do arquivo JSON
fetch("quiz.json")
    .then(resposta => resposta.json())
    .then(dados => {

        perguntas = dados;

        btnIniciar.addEventListener("click", () => {

            inicio.style.display = "none";
            quiz.style.display = "block";

            mostrarPergunta();

        });

    })

    .catch(erro => {

        console.log("Erro:", erro);

    });

function mostrarPergunta() {

    // Reinicia a animação da pergunta
    conteudoQuiz.classList.remove("conteudoQuiz");

    // Força o navegador a recalcular o elemento para repetir a animação
    void conteudoQuiz.offsetWidth;

    conteudoQuiz.classList.add("conteudoQuiz");

    // Limpa as alternativas da pergunta anterior
    respostas.innerHTML = "";

    // Exibe a pergunta atual
    pergunta.innerHTML = perguntas[perguntaAtual].pergunta;

    // Cria um botão para cada alternativa
    perguntas[perguntaAtual].opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.innerHTML = opcao;

        botao.addEventListener("click", () => {

            verificarResposta(indice);

        });

        respostas.appendChild(botao);

    });

}

function verificarResposta(respostaEscolhida){

    const respostaCorreta = perguntas[perguntaAtual].resposta;

    // Seleciona todos os botões das alternativas
    const botoes = respostas.querySelectorAll("button");

    botoes.forEach((botao, indice)=>{

        // Impede que o usuário responda novamente
        botao.disabled = true;

        // Destaca a resposta correta
        if(indice === respostaCorreta){

            botao.classList.add("correta");

        }

        // Destaca a resposta errada escolhida pelo usuário
        if(indice === respostaEscolhida && indice !== respostaCorreta){

            botao.classList.add("errada");

        }

    });

    // Soma um ponto caso tenha acertado
    if(respostaEscolhida === respostaCorreta){

        pontuacao++;

    }

    // Exibe o botão para avançar
    btnProxima.style.display = "block";

}

btnProxima.addEventListener("click", ()=>{

    perguntaAtual++;

    if(perguntaAtual < perguntas.length){

        mostrarPergunta();

        btnProxima.style.display = "none";

    }else{

        mostrarResultado();

    }

});

function mostrarResultado(){

    quiz.style.display = "none";
    resultado.style.display = "block";

    let mensagem = "";

    // Mensagem personalizada conforme a pontuação
    if(pontuacao === 5){

        mensagem = "🏆 Excelente! Você domina muito bem esse conteúdo.";

    }else if(pontuacao === 4){

        mensagem = "👏 Muito bom! Você foi muito bem.";

    }else if(pontuacao === 3){

        mensagem = "👍 Bom trabalho! Continue praticando.";

    }else{

        mensagem = "🙁 Não foi dessa vez! Continue estudando!";

    }

    // Exibe a pontuação final
    pontuacaoTexto.innerHTML = `
        <h2>${pontuacao}/${perguntas.length}</h2>
        <p>${mensagem}</p>
    `;

}

// Alterna entre modo claro e escuro
temaBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    // Salva o tema escolhido no navegador
    if(document.body.classList.contains("dark")){

        localStorage.setItem("tema", "dark");
        iconeTema.className = "bi bi-sun-fill";

    }else{

        localStorage.setItem("tema", "light");
        iconeTema.className = "bi bi-moon-fill";

}

});

