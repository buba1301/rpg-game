class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
      spriteW: 48,
      spriteH: 48,
      groupName: 'terrain',
    });
  }

  init() {
    const { map } = this.levelCfg;

    map.forEach((configRow, y) => {
      configRow.forEach((configCell, x) => {
        const [terrainName] = configCell;

        this.engine.renderSpriteFrame({
          sprite: [this.groupName, terrainName],
          frame: 0,
          x: x * this.spriteW,
          y: y * this.spriteH,
          w: this.spriteW,
          h: this.spriteH,
        });
      });
    });
  }
}

export default ClientWorld;
