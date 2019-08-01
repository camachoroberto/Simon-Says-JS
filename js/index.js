// Variáveis globais
let simonSequence = [];
let playerSequence = [];
const numOfLevels = 10;
let numberFlashLight;
let simonTurn;
let good;
let compTurn;
let intervalFlashLight;

let strict = false;
let noise = true;
let on = false;
let playerTurn = false;
let win;

let winnerAudio = new Audio('included/sounds/winner.mp3');
let errorStar = new Audio('included/sounds/error.mp3');
let errorAudio = new Audio('included/sounds/lose.wav');
let simonSound1 = new Audio('included/sounds/simonSound1.mp3');
let simonSound2 = new Audio('included/sounds/simonSound2.mp3');
let simonSound3 = new Audio('included/sounds/simonSound3.mp3');
let simonSound4 = new Audio('included/sounds/simonSound4.mp3');
let selectSound = new Audio('included/sounds/select.mp3');
let starSound = new Audio('included/sounds/start.wav');

// Seleção das cores do jogo
const turnCounter = document.querySelector('#count');
const topLeft = document.querySelector('#top-left');
const topRigth = document.querySelector('#top-rigth');
const downLeft = document.querySelector('#down-left');
const downRigth = document.querySelector('#down-rigth');

const strictButton = document.querySelector('#btn-strict');
const startButton = document.querySelector('#btn-start');
const setTarget = document.querySelector('[data-onoff]');
const mensagem = document.getElementById('mensagem');

mensagem.addEventListener('click', function () {
  Swal.fire({
    title: 'How to Play?',
    type: 'question',
    html: "<ul style='text-align: left'>" +
            '  <li>Click the switch to turn on.</li>' +
            '  <li>Press play to start.</li>' +
            '  <li>Repeat the steps in the correct order.</li>' +
            '  <li>Turn on strict mode for an extra challege &#128513</li>' +
            '  <li>Have Fun!</li>' +
            '</ul>',
    showCloseButton: true,
    confirmButtonText: "<i class='fa fa-thumbs-up'></i> Got It!"
  });
});

//Button Strict
strictButton.addEventListener('click', function () {
  if (!strict) {
    strict = true;
    document.getElementById('strictonoff').style.background = '#990000';
    selectSound.play();
  } else {
    strict = false;
    document.getElementById('strictonoff').style.background = '#404040';
    selectSound.play();
  }
});

//Button On - Off
setTarget.addEventListener('change', function () {
  if (this.checked) {
    on = true;
    turnCounter.innerHTML = '- -';
    selectSound.play();
  }
  else {
    on = false;
    turnCounter.innerHTML = '';
    clearColor();
    selectSound.play();
    clearInterval(intervalFlashLight);
  }
});

//Button Start
startButton.addEventListener('click', (event) => {
  if (on || win) {
    starSound.play();
    simonPlay();
  } else {
    errorStar.play();
  }
});

// Cria a sequência do jogo
function simonPlay() {
  win = false;
  simonSequence = [];
  playerSequence = [];
  numberFlashLight = 0;
  simonTurn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (let i = 0; i < numOfLevels; i++) {
    simonSequence.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  intervalFlashLight = setInterval(gameTurn, 800);
}

// Turno do jogo
function gameTurn() {
  playerTurn = false;
  on = false;
  if (numberFlashLight == simonTurn) {
    clearInterval(intervalFlashLight);
    compTurn = false;
    clearColor();
    on = true;
    playerTurn = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (simonSequence[numberFlashLight] == 1) one();
      if (simonSequence[numberFlashLight] == 2) two();
      if (simonSequence[numberFlashLight] == 3) three();
      if (simonSequence[numberFlashLight] == 4) four();
      numberFlashLight++;
    }, 200);
  }
}

// Alternância das cores selecionadas
function one() {
  if (noise) {
    simonSound1.play();
  }
  noise = true;
  topLeft.style.backgroundColor = 'lightgreen';
}

function two() {
  if (noise) {
    simonSound2.play();
  }
  noise = true;
  topRigth.style.backgroundColor = 'tomato';
}

function three() {
  if (noise) {
    simonSound3.play();
  }
  noise = true;
  downLeft.style.backgroundColor = 'yellow';
}

function four() {
  if (noise) {
    simonSound4.play();
  }
  noise = true;
  downRigth.style.backgroundColor = 'lightskyblue';
}

//Função para retornar a cor do estado inicial
function clearColor() {
  topLeft.style.backgroundColor = 'darkgreen';
  topRigth.style.backgroundColor = 'darkred';
  downLeft.style.backgroundColor = 'goldenrod';
  downRigth.style.backgroundColor = 'darkblue';
}

//Função para alterar a cor correspondente da sequencia do jogo
function flashColor() {
  topLeft.style.backgroundColor = 'lightgreen';
  topRigth.style.backgroundColor = 'tomato';
  downLeft.style.backgroundColor = 'yellow';
  downRigth.style.backgroundColor = 'lightskyblue';
}

// Cor selecionada pelo jogador
topLeft.addEventListener('click', (event) => {

  if (on && playerTurn) {
    playerSequence.push(1);
    verifySelected();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

topRigth.addEventListener('click', (event) => {
  if (on && playerTurn) {
    playerSequence.push(2);
    verifySelected();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

downLeft.addEventListener('click', (event) => {
  if (on && playerTurn) {
    playerSequence.push(3);
    verifySelected();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

downRigth.addEventListener('click', (event) => {
  if (on && playerTurn) {
    playerSequence.push(4);
    verifySelected();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

//Verifica e compara as cores selecionadas 
function verifySelected() {
  if (playerSequence[playerSequence.length - 1] !== simonSequence[playerSequence.length - 1]) {
    good = false;
  }
  console.log(`level ${numOfLevels}`);
  console.log(`play ${playerSequence.length}`);
  if (playerSequence.length == numOfLevels && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = 'NO!';
    errorAudio.play();
    setTimeout(() => {
      turnCounter.innerHTML = simonTurn;
      clearColor();

      if (strict) {
        simonPlay();
      } else {
        compTurn = true;
        numberFlashLight = 0;
        playerSequence = [];
        good = true;
        intervalFlashLight = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (simonTurn == playerSequence.length && good && !win) {
    simonTurn++;
    playerSequence = [];
    compTurn = true;
    numberFlashLight = 0;
    turnCounter.innerHTML = simonTurn;
    intervalFlashLight = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = 'WIN!';
  win = true;
  on = false;
  setTimeout(() => { winnerAudio.play() }, 400);
}
