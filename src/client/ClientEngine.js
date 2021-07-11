/* eslint-disable no-unused-vars */
class ClientEngine {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
    });

    this.ctx = canvas.getContext('2d');

    this.loop = this.loop.bind(this);
  }

  start() {
    this.loop();
  }

  loop(timeStamp) {
    const { canvas, ctx } = this;
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);

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
}

export default ClientEngine;