import './index.scss';
import Face from './assets/assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const upStop = 0;
const bottomStop = 550;
const leftStop = 0;
const rigthStop = 560;
const shots = 3;

let direction = 0;
let cycle = 0;
let bottomPress = false;
let pY = 280;
let upPress = false;

let leftPress = false;
let rigthPress = false;
let pX = 280;

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

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPress && pY !== bottomStop) {
      pY += 10;
      direction = 0;
      cycle = (cycle + 1) % shots;
    }
    if (upPress && pY !== upStop) {
      pY -= 10;
      direction = 3;
      cycle = (cycle + 1) % shots;
    }
    if (leftPress && pX !== leftStop) {
      pX -= 10;
      direction = 1;
      cycle = (cycle + 1) % shots;
    }
    if (rigthPress && pX !== rigthStop) {
      pX += 10;
      direction = 2;
      cycle = (cycle + 1) % shots;
    }
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, direction * spriteH, spriteH, spriteW, pX, pY, 48, 48);
  }, 120);
});
