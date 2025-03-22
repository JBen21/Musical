// Obter o botão, a div de pontuação, o input de resposta e o botão de verificar
const botao = document.getElementById("botao");
const pontuacao = document.getElementById("pontuacao");
const resposta = document.getElementById("resposta");
const verificar = document.getElementById("verificar");
const rank = document.getElementById("rank");

// Iniciar a pontuação
let pontos = 0;

// Array de cores
const cores = ["Vermelho", "Azul", "Verde", "Amarelo", "Rosa"];

// Array de cores em hexadecimal
const coresHex = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF"];

// Variável para armazenar a cor atual
let corAtual;

// Variável para armazenar o nome do jogador
let nomeJogador;

// Variável para armazenar o número de erros
let erros = 0;

// Variável para armazenar o número máximo de erros
const maxErros = 3;

// Solicitar o nome do jogador
nomeJogador = prompt("Digite seu nome:");


// Função para gerar uma cor aleatória
function getRandomColor() {
    const index = Math.floor(Math.random() * cores.length);
    return { nome: cores[index], hex: coresHex[index] };
}

// Função para atualizar o rank de pontuação
function atualizarRank() {
    const rankStorage = localStorage.getItem("rank");
    if (rankStorage) {
        const rankArray = JSON.parse(rankStorage);
        const jogadorExistente = rankArray.find((jogador) => jogador.nome === nomeJogador);
        if (jogadorExistente) {
            if (pontos > jogadorExistente.pontos) {
                jogadorExistente.pontos = pontos;
            }
        } else {
            rankArray.push({ nome: nomeJogador, pontos: pontos });
        }
        rankArray.sort((a, b) => b.pontos - a.pontos);
        localStorage.setItem("rank", JSON.stringify(rankArray));
    } else {
        const rankArray = [{ nome: nomeJogador, pontos: pontos }];
        localStorage.setItem("rank", JSON.stringify(rankArray));
    }
    rank.innerHTML = "";
    const rankStorageAtualizado = localStorage.getItem("rank");
    const rankArrayAtualizado = JSON.parse(rankStorageAtualizado);
    rankArrayAtualizado.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nome}: ${item.pontos} pontos`;
        rank.appendChild(li);
    });
}

// Adicionar evento de clique ao botão
botao.addEventListener("click", () => {
    corAtual = getRandomColor();
    botao.style.backgroundColor = corAtual.hex;
    resposta.value = "";
});

// Adicionar evento de clique ao botão de verificar
verificar.addEventListener("click", () => {
    const respostaUsuario = resposta.value;
    if (respostaUsuario.toLowerCase() === corAtual.nome.toLowerCase()) {
        pontos++;
        pontuacao.textContent = `Pontos: ${pontos}`;
        alert("Correta!");
    } else {
        erros++;
        alert(`Errada! A cor certa é ${corAtual.nome}. Você tem ${maxErros - erros} chances restantes.`);
        if (erros >= maxErros) {
            alert("Você excedeu o número máximo de erros! O jogo será reiniciado.");
            // Reiniciar o jogo
            pontos = 0;
            erros = 0;
            pontuacao.textContent = `Pontos: ${pontos}`;
            nomeJogador = prompt("Digite seu nome:");
        }
    }
    // Mudar a cor do botão automaticamente
    corAtual = getRandomColor();
    botao.style.backgroundColor = corAtual.hex;
    // Atualizar o rank de pontuação
    atualizarRank();
});

// Adicionar evento de clique ao botão de resetar rank
const resetRankButton = document.getElementById("reset-rank");
resetRankButton.addEventListener("click", () => {
    localStorage.removeItem("rank");
    rank.innerHTML = "";
    alert("Rank de pontuação resetado!");
});
