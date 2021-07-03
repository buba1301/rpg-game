import './index.scss';
import Face from './assets/assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let bottomPress = false;
let pY = 0;

const img = document.createElement('img');
img.src = Face;

const keyDownHandler = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPress = true;
  }
};

const keyUpHandler = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPress = false;
  }
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPress) {
      pY += 10;
      cycle = (cycle + 1) % shots;
    }
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, 0, spriteH, spriteW, 0, pY, 48, 48);
  }, 120);
});
