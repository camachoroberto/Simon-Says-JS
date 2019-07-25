//Variáveis globais
let simonSequence = [];
let playerSequence = [];
let numOfLevels = 20;

let numberFlashLight;
let playerResponse;

let simonTurn;
let intervalFlashLight;

//Seleção das cores do jogo
const topLeft = document.querySelector('#top-left');
const topRigth = document.querySelector('#top-rigth');
const downLeft = document.querySelector('#down-left');
const downRigth = document.querySelector('#down-rigth');
const turnCounter = document.querySelector('#count');

//Sequência aleatória das cores do jogo 
function simonPlay() {
    simonTurn = 1;
    for (let i = 0; i < numOfLevels; i++) {
        simonSequence.push(Math.floor(Math.random() * 4) + 1);
    }

    intervalFlashLight = setInterval(gameTurn, 800);
};

//Turno do jogo
function gameTurn() {

};

//Preferência das cores do jogador 
topLeft.addEventListener('click', (event) => {
    playerSequence.push(1);
    one();
});

topRigth.addEventListener('click', (event) => {
    playerSequence.push(2);
});

downLeft.addEventListener('click', (event) => {
    playerSequence.push(3);
});

downRigth.addEventListener('click', (event) => {
    playerSequence.push(4);
});

//Alternância das cores selecionadas 
function one() {
    topLeft.style.backgroundColor = "lightgreen";
}

simonPlay();
console.log(simonSequence);
console.log(playerSequence);
