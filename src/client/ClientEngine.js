/* eslint-disable no-unused-vars */
class ClientEngine {
  constructor(canvas) {
    console.log('CANVAS', canvas);

    Object.assign(this, {
      canvas,
      ctx: null,
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
}

export default ClientEngine;
