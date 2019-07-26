// Variáveis globais
let simonSequence = [];
let playerSequence = [];
let numOfLevels = 20;
let numberFlashLight;
let simonTurn;
let intervalFlashLight;

let strict = false
let on = true;
let win;

// Seleção das cores do jogo
const topLeft = document.querySelector('#top-left');
const topRigth = document.querySelector('#top-rigth');
const downLeft = document.querySelector('#down-left');
const downRigth = document.querySelector('#down-rigth');
const turnCounter = document.querySelector('#count');

const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");


strictButton.addEventListener('click', (event) => {
    if (strictButton.checked ==true){
        strict = true;
    }else{
        strict = false;
    };
});

onButton.addEventListener('click', (event) =>{
    if(onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "-";
    } else{
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalFlashLight);
    }
})

startButton.addEventListener('click', (event) =>{
    if(on || win){
        simonPlay();
    }
});

// Sequência aleatória das cores do jogo
function simonPlay() {
    simonTurn = 1;
    for (let i = 0; i < numOfLevels; i++) {
        simonSequence.push(Math.floor(Math.random() * 4) + 1);
    }

    intervalFlashLight = setInterval(gameTurn, 800);
}

// Turno do jogo
function gameTurn() {

    if (numberFlashLight == simonTurn) {
        clearInterval(intervalFlashLight);
        clearColor();
    }

    if (simonSequence) {
        clearColor();
        setTimeout(() => {
            if (simonSequence[numberFlashLight] === 1) one();
            if (simonSequence[numberFlashLight] === 2) two();
            if (simonSequence[numberFlashLight] === 3) three();
            if (simonSequence[numberFlashLight] === 4) four();
            numberFlashLight++;
        }, 200);
    }
}

// Alternância das cores selecionadas
function one() {
    topLeft.style.backgroundColor = 'lightgreen';
}

function two() {
    topRigth.style.backgroundColor = 'tomato';
}

function three() {
    downLeft.style.backgroundColor = 'yellow';
}

function four() {
    downRigth.style.backgroundColor = 'lightskyblue';
}

function clearColor() {
    topLeft.style.backgroundColor = 'darkgreen';
    topRigth.style.backgroundColor = 'darkred';
    downLeft.style.backgroundColor = 'goldenrod';
    downRigth.style.backgroundColor = 'darkblue';
}

function flashColor() {
    topLeft.style.backgroundColor = 'lightgreen';
    topRigth.style.backgroundColor = 'tomato';
    downLeft.style.backgroundColor = 'yellow';
    downRigth.style.backgroundColor = 'lightskyblue';
}

// Preferência das cores do jogador
topLeft.addEventListener('click', (event) => {
    playerSequence.push(1);
    verifySelected();
    one();
    if (!win) {
        setTimeout(() => {
            clearColor();
        }, 300);
    }
});

topRigth.addEventListener('click', (event) => {
    playerSequence.push(2);
    verifySelected();
    two();
    if (!win) {
        setTimeout(() => {
            clearColor();
        }, 300);
    }
});

downLeft.addEventListener('click', (event) => {
    playerSequence.push(3);
    verifySelected();
    three();
    if (!win) {
        setTimeout(() => {
            clearColor();
        }, 300);
    }
});

downRigth.addEventListener('click', (event) => {
    playerSequence.push(4);
    four();
    if (!win) {
        setTimeout(() => {
            clearColor();
        }, 300);
    }
});

function verifySelected () {
    if(simonTurn == playerSequence.length){
        simonTurn++;
        playerSequence = []
        intervalFlashLight = setInterval( gameTurn,800)
    }
}

//simonPlay();

