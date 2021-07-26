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
  }

  setPlayer(player) {
    this.player = player;
  }

  getWorld() {
    return this.map;
  }

  createEngine() {
    const canvas = document.getElementById(this.cfg.tagId);
    return new ClientEngine(canvas, this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player);
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  moveBy(keydown, x, y, dir) {
    const { player } = this;

    if (keydown) {
      if (player && player.motionProgress === 1) {
        const conditionCallback = (cell) => cell.findObjectsByType('grass').length;
        const canMove = player.moveByCellCoord(x, y, conditionCallback);

        if (canMove) {
          player.setState(dir);
          player.once('motion-stopped', () => player.setState('main'));
        }
      }
    }
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        this.moveBy(keydown, -1, 0, 'left');
      },
      ArrowDown: (keydown) => {
        this.moveBy(keydown, 0, 1, 'down');
      },
      ArrowUp: (keydown) => {
        this.moveBy(keydown, 0, -1, 'up');
      },
      ArrowRight: (keydown) => {
        this.moveBy(keydown, 1, 0, 'right');
      },
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
