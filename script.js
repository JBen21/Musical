// Obter a imagem, a div de pontuação, o input de resposta e o botão de verificar
const imagem = document.getElementById("imagem");
const pontuacao = document.getElementById("pontuacao");
const resposta = document.getElementById("resposta");
const verificar = document.getElementById("verificar");
const rank = document.getElementById("rank");

// Iniciar a pontuação
let pontos = 0;

// Array de imagens
const imagens = [
    { src: "casa.jpg", nome: "Casa" },
    { src: "carro.jpg", nome: "Carro" },
    { src: "arvore.jpg", nome: "Árvore" },
    // Adicione mais imagens aqui
];

// Variável para armazenar a imagem atual
let imagemAtual;

// Variável para armazenar o nome do jogador
let nomeJogador;

// Variável para armazenar o número de erros
let erros = 0;

// Variável para armazenar o número máximo de erros
const maxErros = 3;

// Solicitar o nome do jogador
nomeJogador = prompt("Digite seu nome:");

// Função para gerar uma imagem aleatória
function getRandomImagem() {
    const index = Math.floor(Math.random() * imagens.length);
    return imagens[index];
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

// Adicionar evento de clique ao botão de verificar
verificar.addEventListener("click", () => {
    const respostaUsuario = resposta.value;
    if (respostaUsuario.toLowerCase() === imagemAtual.nome.toLowerCase()) {
        pontos++;
        pontuacao.textContent = `Pontos: ${pontos}`;
        alert("Correta!");
    } else {
        erros++;
        alert(`Errada! A imagem certa é ${imagemAtual.nome}. Você tem ${maxErros - erros} chances restantes.`);
        if (erros >= maxErros) {
            alert("Você excedeu o número máximo de erros! O jogo será reiniciado.");
            // Reiniciar o jogo
            pontos = 0;
            erros = 0;
            pontuacao.textContent = `Pontos: ${pontos}`;
            nomeJogador = prompt("Digite seu nome:");
        }
    }
    // Mudar a imagem automaticamente
    imagemAtual = getRandomImagem();
    imagem.src = imagemAtual.src;
    resposta.value = "";
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

// Iniciar o jogo com uma imagem aleatória
imagemAtual = getRandomImagem();
imagem.src = imagemAtual.src;