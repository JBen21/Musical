// Obter o botão, a div de pontuação, o input de resposta e o botão de verificar
const botao = document.getElementById("botao");
const pontuacao = document.getElementById("pontuacao");
const resposta = document.getElementById("resposta");
const verificar = document.getElementById("verificar");

// Iniciar a pontuação
let pontos = 0;

// Array de cores
const cores = ["Vermelho", "Azul", "Verde", "Amarelo", "Rosa"];

// Array de cores em hexadecimal
const coresHex = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF"];

// Variável para armazenar a cor atual
let corAtual;

// Função para gerar uma cor aleatória
function getRandomColor() {
    const index = Math.floor(Math.random() * cores.length);
    return { nome: cores[index], hex: coresHex[index] };
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
        alert(`Errada! A cor certa é ${corAtual.nome}.`);
    }
    // Mudar a cor do botão automaticamente
    corAtual = getRandomColor();
    botao.style.backgroundColor = corAtual.hex;
});