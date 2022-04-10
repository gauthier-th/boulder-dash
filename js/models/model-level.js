import { WallCell } from "./cells/model-cell-wall.js";
import { DiamondCell } from "./cells/model-cell-diamond.js";
import { EarthCell } from "./cells/model-cell-earth.js";
import { RockCell } from "./cells/model-cell-rock.js";
import { VoidCell } from "./cells/model-cell-void.js";
import { StartPointCell } from "./cells/model-cell-startpoint.js";
import { PlayerCell } from "./cells/model-cell-player.js";
import { ExplodeCell } from "./cells/model-cell-explode.js";

/**
 * Class representing a level.
 */
export class Level {

  /**
   * @type {Array[16][32]}
   */
  #cells; // cells[16][32]

  /**
   * @type {Cell}
   */
  #startPoint;

  /**
   * @type {playerCell}
   */
  #playerCell;

  /**
   * @type {boolean}
   */
  #gravityNeedChecking = true;

  /**
   * @type {Subject}
   */
  #controller;

  /**
   * @type {number}
   */
  #diamondCountStart = 0;

  /**
   * @type {number}
   */
  #diamondCount = 0;

  /**
   * @type {number}
   */
  #moveCount = -1;

  /**
   * constructor of the level
   * @param {Subject} controller the controller of the game
   * @param {number} moveCount the number of moves 
   */
  constructor(controller, moveCount) {
    this.#cells = new Array(16).fill(null).map(() => new Array(32).fill(null));
    this.#playerCell = new PlayerCell();
    this.#controller = controller;
    if (moveCount)
      this.#moveCount = moveCount;
  }

  /**
   * load the level from a text
   * @param {string} cellsText the text of the level
   * @param {number} diamondCountStart the number of diamonds at the start
   * @param {number} diamondCount the number of diamonds getted
   */
  loadLevelFromText(cellsText, diamondCountStart, diamondCount) {
    let x = 0;
    let y = 0;
    for (let line of cellsText.split(/\r?\n/g)) {
      for (let index = 0; index < line.length; index++) {
        let char = line[index];
        let cell = null;
        cell = new VoidCell();
        switch (char) {
          case "M":
            cell = new WallCell();
            break;
          case "D":
            cell = new DiamondCell();
            if (!diamondCountStart)
              this.#diamondCountStart++;
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
          case "X":
            cell = this.#playerCell;
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

    if (diamondCountStart && diamondCount) {
      this.#diamondCountStart = diamondCountStart;
      this.#diamondCount = diamondCount;
    }
    else
      this.#diamondCount = this.#diamondCountStart;
  }

  /**
   * generate the text representation of the level
   * @returns {string} the text of the level
   */
  levelToText() {
    let text = "";
    for (let i = 0; i < this.#cells.length; i++) {
      const line = this.#cells[i];
      for (let j = 0; j < line.length; j++) {
        const cell = this.#cells[i][j];
        text += cell.getLetter();
      }
      text+="\n"
    }
    return text;
  }

  get cells() {
    return this.#cells;
  }

  get startPoint() {
    return this.#startPoint;
  }

  get playerCell() {
    return this.#playerCell;
  }

  /**
   * move the player to the given position
   * @param {number} x
   * @param {number} y
   * @param {string} direction the direction of the movement 
   */
  movePlayer(x, y, direction="") {
    let cell = this.#cells[x][y];
    const letterCell = cell.getLetter();
    if (["P"].includes(letterCell)) {
      this.#moveCount++;
      this.#playerCell.setPosition(x, y);
      this.#cells[x][y] = this.#playerCell;
    }
    else if (cell.destroyable) {
      this.#moveCount++;
      let oldX = this.#playerCell.x;
      let oldY = this.#playerCell.y;
      this.#cells[oldX][oldY] = new VoidCell();
      this.#cells[oldX][oldY].setPosition(oldX, oldY);

      this.#cells[x][y] = this.#playerCell;
      this.#playerCell.setPosition(x, y);

      if (letterCell == "D")
        this.refreshDiamondCount();

      cell.onDestroy();
    }
    else if (letterCell=="R" && ["LEFT", "RIGHT"].includes(direction)) {
      this.#moveCount++;
      let newX, newY;
      if (direction == "LEFT") {
        newX = x+0;
        newY = y-1;
      }
      else if (direction == "RIGHT") {
        newX = x+0;
        newY = y+1;
      }

      if (this.#cells[newX][newY].getLetter()=="V") {
        cell.setPosition(newX, newY);
        this.#cells[newX][newY] = cell;

        this.#cells[x][y] = new VoidCell();
        this.#cells[x][y].setPosition(x, y);

        this.movePlayer(x, y, direction);
      }
    }
  }

  get gravityNeedChecking() {
    return this.#gravityNeedChecking;
  }

  set gravityNeedChecking(value) {
    this.#gravityNeedChecking = value;
  }

  /**
   * return the cell below the given cell
   * @param {Cell} cell cell to get the cell below
   * @returns {Cell} the cell below the given cell
   */
  getLowerCell(cell) {
    return this.#cells[cell.x+1][cell.y];
  }

  /**
   * function to check if there are rocks to fall
   */
  checkGravity() {
    if (!this.gravityNeedChecking)
      return;

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
            
            if (this.getLowerCell(cell).getLetter()=="X") {
              this.explode(cell.x, cell.y);
              this.killPlayer();
            }

            this.gravityNeedChecking = true;
          }
        }
      }
    }

    this.#controller.notify();
  }

  get diamondCountStart() {
    return this.#diamondCountStart;
  }

  get diamondCount() {
    return this.#diamondCount;
  }

  get moveCount() {
    return this.#moveCount;
  }

  /**
   * refresh the diamond count remaining on the level
   */
  refreshDiamondCount() {
    let count = 0;
    for (let x = this.#cells.length-1; x >= 0; x--) {
      const yS = this.#cells[x];
      for (let y = yS.length-1; y >= 0; y--) {
        let cell = this.#cells[x][y];
        if (cell.getLetter() == "D") {
          count++;
        }
      }
    }

    this.#diamondCount = count;
  }

  /**
   * make a explosion at the given position
   * @param {number} x 
   * @param {number} y 
   */
  explode(x, y) {
    for (let dX = -1; dX <= 1; dX++) {
      for (let dY = -1; dY <= 1; dY++) {
        let cell = this.#cells[x+dX][y+dY];
        if (cell.getLetter() != "M") {
          this.#cells[x+dX][y+dY] = new ExplodeCell();
          this.#cells[x+dX][y+dY].setPosition(x+dX, y+dY);
          setTimeout(() => {
            this.#cells[x+dX][y+dY] = new VoidCell();
            this.#cells[x+dX][y+dY].setPosition(x+dX, y+dY);
            if (dX == 1 && dY == 1)
              this.#controller.notify();
              this.#gravityNeedChecking = true;
          }, 400);
        }
      }
    }
  }

  /**
   * kill the player and restart the game after 3 seconds
   */
  killPlayer() {
    this.#playerCell = null;
    setTimeout(() => this.#controller.restartGame(), 3000);
  }

  /**
   * generate the text representation of the level
   * @returns {string} the text of the level
   */
  toString() {
    let text = "";
    for (let i = 0; i < this.#cells.length; i++) {
      const line = this.#cells[i];
      for (let j = 0; j < line.length; j++) {
        const cell = this.#cells[i][j];
        text += cell.getLetter();
      }
      text += "\n";
    }
    return text;
  }
}