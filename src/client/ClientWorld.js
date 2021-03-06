import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';

class ClientWorld extends PositionedObject {
  constructor(game, engine, levelCfg) {
    super();

    const worldHeight = levelCfg.map.length;
    const worldWidth = levelCfg.map[0].length;
    const cellSize = engine.canvas.height / levelCfg.camera.height;

    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      worldHeight,
      worldWidth,
      cellWidth: cellSize,
      cellHeight: cellSize,
      map: [],
    });
  }

  init() {
    const { levelCfg, map, worldWidth, worldHeight } = this;

    for (let row = 0; row < worldHeight; row += 1) {
      for (let cell = 0; cell < worldWidth; cell += 1) {
        if (!map[row]) {
          map[row] = [];
        }

        map[row][cell] = new ClientCell({
          world: this,
          cellCol: cell,
          cellRow: row,
          cellCfg: levelCfg.map[row][cell],
        });
      }
    }
  }

  render(time) {
    const { levelCfg, map, worldWidth, worldHeight } = this;

    for (let layerId = 0; layerId < levelCfg.layers.length; layerId += 1) {
      for (let row = 0; row < worldHeight; row += 1) {
        for (let col = 0; col < worldWidth; col += 1) {
          map[row][col].render(time, layerId);
        }
      }
    }
  }

  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }
}

export default ClientWorld;
