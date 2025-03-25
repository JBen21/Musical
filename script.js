
// Obter a imagem, a div de pontuação, o input de resposta o botão de start e o botão de verificar
const imagem = document.getElementById("imagem");
const pontuacao = document.getElementById("pontuacao");
const resposta = document.getElementById("resposta");
const verificar = document.getElementById("verificar");
const rank = document.getElementById("rank");
const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");

// Array de imagens com sons correspondentes
const imagens = [
    { src: "Clave_Fa.jpeg", nome: "Clave de Fa", som: "Clave_Fa" },
    { src: "Do.jpeg", nome: "Do", som: "Do" },
    { src: "Do_2.jpeg", nome: "Do", som: "Do_2" },
    { src: "Re.jpeg", nome: "Re", som: "Re" },
    { src: "Mi.jpeg", nome: "Mi", som: "Mi" },
    { src: "Mi_2.jpeg", nome: "Mi", som: "Mi_2" },
    { src: "Fa.jpeg", nome: "Fa", som: "Fa" },
    { src: "Fa_2.jpeg", nome: "Fa", som: "Fa_2" },
    { src: "Sol.jpeg", nome: "Sol", som: "Sol" },
    { src: "Sol_2.jpeg", nome: "Sol", som: "Sol_2" },
    { src: "La.jpeg", nome: "La", som: "La" },
    { src: "La_2.jpeg", nome: "La", som: "La_2" },
    { src: "Si.jpeg", nome: "Si", som: "Si" },
    { src: "Si_2.jpeg", nome: "Si", som: "Si_2" },
];    

// Iniciar a pontuação
let pontos = 0;

// Variável para armazenar a imagem atual
let imagemAtual;

// Variável para armazenar o nome do jogador
let nomeJogador;

// Variável para armazenar o número de erros
let erros = 0;

// Variável para armazenar o número máximo de erros
const maxErros = 3;

// Adicionar evento de clique ao botão de start
startButton.addEventListener("click", () => {

    // Solicitar o nome do jogador após clicar no botão de start
    nomeJogador = prompt("Digite seu nome:");

    gameContainer.style.display = "block";

    // Iniciar o jogo após solicitar o nome do jogador
    imagemAtual = getRandomImagem();
    imagem.src = imagemAtual.src;

    // Tocar o som correspondente à primeira imagem
    const som = document.getElementById(imagemAtual.som);
    som.play();
    
    // Esconder o botão de start após iniciar o jogo
    startButton.style.display = "none";
});

// Função para gerar uma imagem aleatória
function getRandomImagem() {
    const index = Math.floor(Math.random() * imagens.length);
    return imagens[index];
}

// Função para tocar o som correspondente à imagem
function tocarSom(imagem) {
    const som = document.getElementById(imagem.som);
    som.play();
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
        pontos -= 2; // Penalidade por erro
        if (pontos < 0) {
            pontos = 0;
        } 
        pontuacao.textContent = `Pontos: ${pontos}`;   
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
    // Tocar o som correspondente à imagem
    tocarSom({ som: imagemAtual.som });
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