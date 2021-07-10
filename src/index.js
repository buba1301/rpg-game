import './index.scss';
import Face from './assets/assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasWidth = Number(canvas.getAttribute('width'));
const canvasHeight = Number(canvas.getAttribute('height'));

const coordX = 0;
const coordY = 0;
const spriteW = 48;
const spriteH = 48;

const upStop = 0;
const bottomStop = canvasHeight - spriteH;
const leftStop = 0;
const rigthStop = canvasWidth - spriteW;

const shots = 3;

const moveDown = 0;
const moveLeft = 1;
const moveRigth = 2;
const moveUp = 3;

const shiftForward = 12;
const shiftBack = -12;

let direction = moveDown;
let cycle = 0;
let bottomPress = false;
let upPress = false;
let leftPress = false;
let rigthPress = false;
let pY = canvasHeight / 2 - spriteH;

let pX = canvasWidth / 2 - spriteW;

const img = document.createElement('img');
img.src = Face;

const keyDownHandler = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPress = true;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPress = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPress = true;
  } else {
    rigthPress = true;
  }
};

const keyUpHandler = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPress = false;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPress = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPress = false;
  } else {
    rigthPress = false;
  }
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const makeCharacterMove = (shift, curDirection, coord = 'X') => {
  if (coord === 'Y') {
    pY += shift;
  } else {
    pX += shift;
  }
  direction = curDirection;
  cycle = (cycle + 1) % shots;
};

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPress && pY !== bottomStop) {
      makeCharacterMove(shiftForward, moveDown, 'Y');
    }
    if (upPress && pY !== upStop) {
      makeCharacterMove(shiftBack, moveUp, 'Y');
    }
    if (leftPress && pX !== leftStop) {
      makeCharacterMove(shiftBack, moveLeft);
    }
    if (rigthPress && pX !== rigthStop) {
      makeCharacterMove(shiftForward, moveRigth);
    }
    ctx.clearRect(coordX, coordY, canvasWidth, canvasHeight);
    ctx.drawImage(img, cycle * spriteW, direction * spriteH, spriteH, spriteW, pX, pY, 48, 48);
  }, 120);
});
