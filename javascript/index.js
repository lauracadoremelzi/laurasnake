const somFundo = new Audio("music/music.mp3");
const somGameOver = new Audio("music/gameover.mp3");
const somMover = new Audio("music/move.mp3");
const somComer = new Audio("music/food.mp3");

var direcao = { x: 0, y: 1 };
var cobrinha = [{ x: 5, y: 5 }]
var fruta = {
    x: Math.floor(Math.random() * 18),
    y: Math.floor(Math.random() * 18)
}
var pontos = 0;

var ultimaVezAtualizada = 0;
var VELOCIDADE = 1;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimaVezAtualizada) / 1000 < (1 / VELOCIDADE)) {
        return;
    }
    ultimaVezAtualizada = tempoAtual;

    atualizaGame();
}

function atualizaGame() {

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = { ...cobrinha[i] }
    }

    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;

    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            parteCobrinha.classList.add("head");
        } else {
            parteCobrinha.classList.add("snake");
        }

        board.appendChild(parteCobrinha);
    }

    var food = document.createElement("div");
    food.style.gridColumnStart = fruta.y;
    food.style.gridRowStart = fruta.x;
    food.classList.add("fruta");
    board.appendChild(food);
}


function direcionaCobrinha(e) {
    somMover.play();
    switch (e.code) {
        case "KeyW":
            direcao.x = 0
            direcao.y = -1;
            break;
        case "KeyA":
            direcao.x = -1
            direcao.y = 0;
            break;
        case "KeyS":
            direcao.x = 0
            direcao.y = 1;
            break;
        case "KeyD":
            direcao.x = 1
            direcao.y = 0;
            break
    }
}

window.addEventListener("keydown", (e) => direcionaCobrinha(e))




principal();