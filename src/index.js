import './index.scss';
import Face from './assets/Male-4-Walk.png';
import terrainAtlas from './assets/terrain.png';
import worldCfg from './configs/world.json';
import sprites from './configs/sprites';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const spriteW = 48;
const spriteH = 48;
/* const shots = 3;

const direction = 0;
const cycle = 0;
const bottomPress = false;
const pY = 0;
const upPress = false;

const leftPress = false;
const rigthPress = false;
const pX = 0; */

const img = document.createElement('img');
img.src = Face;

const terrain = document.createElement('img');
terrain.src = terrainAtlas;

terrain.addEventListener('load', () => {
  const { map } = worldCfg;

  map.forEach((configRow, y) => {
    configRow.forEach((configCell, x) => {
      const [terrainName] = configCell;

      const { frames } = sprites.terrain[terrainName];
      const [sY, sX, sW, sH] = frames[0];
      ctx.drawImage(terrain, sY, sX, sW, sH, x * spriteW, y * spriteH, spriteW, spriteH);
    });
  });
});

/* const keyDownHandler = (e) => {
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
    if (bottomPress) {
      pY += 10;
      direction = 0;
      cycle = (cycle + 1) % shots;
    }
    if (upPress) {
      pY -= 10;
      direction = 3;
      cycle = (cycle + 1) % shots;
    }
    if (leftPress) {
      pX -= 10;
      direction = 1;
      cycle = (cycle + 1) % shots;
    }
    if (rigthPress) {
      pX += 10;
      direction = 2;
      cycle = (cycle + 1) % shots;
    }
    ctx.clearRect(0, 0, 600, 600);
    ctx.drawImage(img, cycle * spriteW, direction * spriteH, spriteH, spriteW, pX, pY, 48, 48);
  }, 120);
}); */
