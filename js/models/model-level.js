import { WallCell } from "./cells/model-cell-wall.js";
import { DiamondCell } from "./cells/model-cell-diamond.js";
import { EarthCell } from "./cells/model-cell-earth.js";
import { RockCell } from "./cells/model-cell-rock.js";
import { VoidCell } from "./cells/model-cell-void.js";
import { StartPointCell } from "./cells/model-cell-startpoint.js";
import { PlayerCell } from "./cells/model-cell-player.js";

export class Level {

  #cells; // cells[16][32]
  #startPoint;
  #playerCell;
  #gravityNeedChecking = true;
  #controller;

  constructor(controller) {
    this.#cells = new Array(16).fill(null).map(() => new Array(32).fill(null));
    this.#playerCell = new PlayerCell();
    this.#controller = controller;
  }

  loadLevelFromText(cellsText) {
    let x = 0;
    let y = 0;
    for (let line of cellsText.split(/\r?\n/g)) {
      for (let index = 0; index < line.length; index++) {
        let char = line[index];
        let cell = null;
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
            this.#startPoint = cell;
            break;
        }
        if (cell !== null) {
          cell.setPosition(x, y)
          this.#cells[x][y] = cell;
          y++;
        }
      }
      y = 0;
      x++;
    }
  }

  get cells() {
    return this.#cells;
  }

  get startPoint() {
    return this.#startPoint;
  }

  get playerCell(){
    return this.#playerCell;
  }

  movePlayer(x, y, direction="") {
    let cell = this.#cells[x][y];
    const letterCell = cell.getLetter();
    if (["P"].includes(letterCell)){
      this.#playerCell.setPosition(x, y);
      this.#cells[x][y] = this.#playerCell;
    }else if(cell.destroyable){
      let oldX = this.#playerCell.x;
      let oldY = this.#playerCell.y;
      this.#cells[oldX][oldY] = new VoidCell();
      this.#cells[oldX][oldY].setPosition(oldX, oldY);

      this.#cells[x][y] = this.#playerCell;
      this.#playerCell.setPosition(x, y);

      cell.onDestroy();
    }else if(letterCell=="R" && ["LEFT", "RIGHT"].includes(direction)){
      let newX, newY;
      if(direction == "LEFT"){
        newX = x+0;
        newY = y-1;
      }else if(direction == "RIGHT"){
        newX = x+0;
        newY = y+1;
      }
      console.log(this.#cells[newX][newY]);
      if(this.#cells[newX][newY].getLetter()=="V"){
        cell.setPosition(newX, newY);
        this.#cells[newX][newY] = cell;

        this.#cells[x][y] = new VoidCell();
        this.#cells[x][y].setPosition(x, y);

        this.movePlayer(x, y, direction);
      }
    }
  }

  get gravityNeedChecking(){
    return this.#gravityNeedChecking;
  }

  set gravityNeedChecking(value){
    this.#gravityNeedChecking = value;
  }

  getLowerCell(cell){
    return this.#cells[cell.x+1][cell.y];
  }

  checkGravity(){
    if(!this.gravityNeedChecking)
      return

    this.gravityNeedChecking = false;

    for (let x = this.#cells.length-1; x >= 0; x--) {
      const yS = this.#cells[x];
      for (let y = yS.length-1; y >= 0; y--) {
        let cell = this.#cells[x][y];
        if (cell.getLetter()=="R") {
          if (this.getLowerCell(cell).getLetter()=="V") {
            this.#cells[x+1][y] = cell;
            cell.setPosition(x+1, y);

            this.#cells[x][y] = new VoidCell();
            this.#cells[x][y].setPosition(x, y);

            this.gravityNeedChecking = true;
          }
        }
      }
    }

    this.#controller.notify();
  }

}