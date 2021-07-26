/* eslint-disable object-curly-newline */
import EventSourceMixin from '../common/EventSourceMixin';
import ClientCamera from './ClientCamera';
import ClientInput from './ClientInput';

/* eslint-disable no-unused-vars */
class ClientEngine {
  constructor(canvas, game) {
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
      camera: new ClientCamera({ canvas, engine: this }),
      input: new ClientInput(canvas),
      game,
      lastRenderTime: 0,
      startTime: 0,
    });

    this.ctx = canvas.getContext('2d');

    this.loop = this.loop.bind(this);
  }

  start() {
    this.loop();
  }

  loop(timeStamp) {
    if (!this.startTime) {
      this.startTime = timeStamp;
    }

    this.lastRenderTime = timeStamp;

    const { canvas, ctx } = this;
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);

    this.trigger('render', timeStamp);
    this.initNextFrame();
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop);
  }

  loadSprites(spritesGroup) {
    this.imageLoaders = [];

    const groupNames = Object.keys(spritesGroup);

    groupNames.forEach((groupName) => {
      const group = spritesGroup[groupName];
      this.sprites[groupName] = group;

      const spriteNames = Object.keys(group);

      spriteNames.forEach((spriteName) => {
        const { img } = group[spriteName];

        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      });
    });

    return Promise.all(this.imageLoaders);
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const i = new Image();
      this.images[url] = i;
      i.onload = () => resolve(i);
      i.src = url;
    });
  }

  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    const [groupName, name] = sprite;

    const spriteCfg = this.sprites[groupName][name];

    const { img, frames } = spriteCfg;

    const [fx, fy, fw, fh] = frames[frame];
    const image = this.images[img];
    const { camera } = this;

    this.ctx.drawImage(image, fx, fy, fw, fh, x - camera.x, y - camera.y, w, h);
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
