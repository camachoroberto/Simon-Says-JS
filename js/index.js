//Varibles
let simonSequence = [];
let playerSequence = [];
let numOfLevels = 20;

const topLeft = document.querySelector('#top-left');
const topRigth = document.querySelector('#top-rigth');
const downLeft = document.querySelector('#top-left');
const downRigth = document.querySelector('#down-rigth');

function gamePlay() {
    for (let i = 0; i < numOfLevels; i++) {
        simonSequence.push(Math.floor(Math.random() * 4) + 1);
    }
};

function userPlay() {

};
 
//player click sequence
topLeft.addEventListener('click', (event) => {
    playerSequence.push(1);
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


gamePlay();
console.log(simonSequence);
console.log(playerSequence);