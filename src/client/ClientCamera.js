import MovableObject from '../common/MovableObject';

class ClientCamera extends MovableObject {
  constructor(cfg) {
    super(cfg);

    Object.assign(
      this,
      {
        width: cfg.canvas.width,
        height: cfg.canvas.height,
      },
      cfg,
    );
  }

  focusAtGameObject(obj) {
    const pos = obj.worldPosition(50, 50);

    const x = pos.x - this.width / 2;
    const y = pos.y - this.height / 10;

    //
    this.moveTo(x, y, false);
  }
}

export default ClientCamera;
