import sprites from '../configs/sprites';
import ClientEngine from './ClientEngine';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
    });

    this.engine = this.createEngine();

    this.initEngine();
  }

  createEngine() {
    const canvas = document.getElementById(this.cfg.tagId);
    return new ClientEngine(canvas);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      console.log('This engine', this.engine);

      this.engine.start();
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INIT');
    }
  }
}

export default ClientGame;
