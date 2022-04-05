import { WallCell } from "./cells/model-cell-wall.js";
import { DiamondCell } from "./cells/model-cell-diamond";
import { EarthCell } from "./cells/model-cell-earth";
import { RockCell } from "./cells/model-cell-rock";
import { VoidCell } from "./cells/model-cell-void";
import { StartPointCell } from "./cells/model-cell-startpoint";

export class Level {

    #cells; // cells[32][16]

    constructor() {
      this.#cells = new Array(32).fill(null).map(() => new Array(16).fill(null));
    }

    loadLevelFromText(cellsText) {
      let x = 0;
      let y = 0;
      for (let line of cellsText.split(/\r?\n/g)){
        for (let index = 0; index < line.length; index++) {
          let char = line[index];
          let cell = null;
          y++;
          switch (char) {
            case "M":
              cell = new WallCell();
              break;
            case "D":
              cell = new DiamondCell();
              break;
            case "T":
              cell = new EarthCell();
              break;
            case "R":
              cell = new RockCell();
              break;
            case "V":
              cell = new VoidCell();
              break;
            case "P":
              cell = new StartPointCell();
              break;
            default:
              y--;
              break;
          }
        }

        if(cell !== null){
          cell.setPosition(x, y)
          this.#cells[x][y] = cell;
        }

        x++;
      }
    }
  
}