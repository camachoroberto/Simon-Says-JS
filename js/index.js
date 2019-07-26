// Variáveis globais
let simonSequence = [];
let playerSequence = [];
let numOfLevels = 20;
let numberFlashLight;
let simonTurn;
let intervalFlashLight;

let win;

// Seleção das cores do jogo
const topLeft = document.querySelector('#top-left');
const topRigth = document.querySelector('#top-rigth');
const downLeft = document.querySelector('#down-left');
const downRigth = document.querySelector('#down-rigth');
const turnCounter = document.querySelector('#count');

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
    if(!win){
        setTimeout(() => {
            clearColor();
        }, 300);
    }
  }
  
  function two() {
    topRigth.style.backgroundColor = 'tomato';
    if(!win){
        setTimeout(() => {
            clearColor();
        }, 300);
    }
  }
  
  function three() {
    downLeft.style.backgroundColor = 'yellow';
    if(!win){
        setTimeout(() => {
            clearColor();
        }, 300);
    }
  }
  
  function four() {
    downRigth.style.backgroundColor = 'lightskyblue';
    if(!win){
        setTimeout(() => {
            clearColor();
        }, 300);
    }
  }

function clearColor() {
  topLeft.style.backgroundColor = 'darkgreen';
  topRigth.style.backgroundColor = 'darkred';
  downLeft.style.backgroundColor = 'goldenrod';
  downRigth.style.backgroundColor = 'darkblue';
}

// Preferência das cores do jogador
topLeft.addEventListener('click', (event) => {
  playerSequence.push(1);
  one();
});

topRigth.addEventListener('click', (event) => {
  playerSequence.push(2);
  two();
});

downLeft.addEventListener('click', (event) => {
  playerSequence.push(3);
  three();
});

downRigth.addEventListener('click', (event) => {
  playerSequence.push(4);
  four();
});

simonPlay();
console.log(simonSequence);
console.log(playerSequence);
