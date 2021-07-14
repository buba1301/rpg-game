import MovableObject from '../common/MovableObject';

class ClientCamera extends MovableObject {
  constructor(cfg) {
    super(cfg);

    Object.assign(
      this,
      {
        width: cfg.canvas.width,
        heigth: cfg.canvas.heigth,
      },
      cfg,
    );
  }

  focusAtGameObject(obj) {
    const pos = obj.worldPosition(50, 50);
    this.moveTo(pos.x - this.width / 2, pos.y - this.heigth / 2, false);
  }
}

export default ClientCamera;