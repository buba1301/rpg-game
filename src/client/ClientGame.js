import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.world = this.createWorld();

    this.initEngine();

    // console.log('CLIENTGame constructor', this.engine);
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    const canvas = document.getElementById(this.cfg.tagId);
    return new ClientEngine(canvas);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        // console.log('Render', time);
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  moveBy(keydown, x, y) {
    if (keydown) {
      const conditionCallback = (cell) => cell.findObjectsByType('grass').length;
      this.player.moveByCellCoord(x, y, conditionCallback);
    }
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        this.moveBy(keydown, -1, 0);
      },
      ArrowDown: (keydown) => {
        this.moveBy(keydown, 0, 1);
      },
      ArrowUp: (keydown) => {
        this.moveBy(keydown, 0, -1);
      },
      ArrowRight: (keydown) => {
        this.moveBy(keydown, 1, 0);
      },
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INIT', cfg);
    }
  }
}

export default ClientGame;
