/* eslint-disable object-curly-newline */
import EventSourceMixin from '../common/EventSourceMixin';
import clamp from '../common/util';
import ClientCamera from './ClientCamera';
import ClientInput from './ClientInput';

/* eslint-disable no-unused-vars */
class ClientEngine {
  constructor(canvas, game) {
    Object.assign(this, {
      canvas,
      canvases: {
        main: canvas,
      },
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

  addCanvas(name, width, height) {
    let canvas = this.canvases[name];

    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      this.canvases[name] = canvas;
    }

    return canvas;
  }

  switchCanvas(name) {
    const canvas = this.canvases[name];

    if (canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }

    return canvas;
  }

  focus() {
    this.canvases.main.focus();
  }

  renderCanvas(name, fromPos, toPos) {
    const canvas = this.canvases[name];

    if (canvas) {
      this.ctx.drawImage(
        canvas,
        fromPos.x,
        fromPos.y,
        fromPos.width,
        fromPos.height,
        toPos.x,
        toPos.y,
        toPos.width,
        toPos.height,
      );
    }
  }

  renderSign(opt) {
    const options = {
      ...opt,
      color: 'Black',
      bgColor: '#f4f4f4',
      font: '16px sans-serif',
      verticalPadding: 5,
      horizontalPadding: 3,
      textAlign: 'center',
      textBaseLine: 'center',
    };

    const { ctx, camera } = this;

    ctx.textBaseLine = options.textBaseLine;
    ctx.textAlign = options.textAlign;
    ctx.font = options.font;

    const measure = ctx.measureText(options.text);
    const textHight = measure.actualBoundingBoxAscent;

    const barWidth = clamp(measure.width + 2 * options.horizontalPadding, options.minWidth, options.maxWidth);
    const barHeight = textHight + 2 * options.verticalPadding;

    const barX = options.x - barWidth / 2 - camera.x;
    const barY = options.y - barHeight / 2 - camera.y;

    const textWidth = clamp(measure.width, 0, barWidth - 2 * options.horizontalPadding);

    ctx.fillStyle = options.bgColor;
    ctx.fillRect(barX, barY, barWidth, barHeight);

    ctx.fillStyle = options.color;
    ctx.fillText(options.text, barX + barWidth / 2, barY + barHeight - options.verticalPadding, textWidth);
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
