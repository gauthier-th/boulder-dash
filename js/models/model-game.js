
import { Level } from "./model-level.js";

/**
 * Class representing a game.
 */
export class Game { 

  /**
   * @type {Level}
   */
  #currentLevel;

  /**
   * @type {number}
   */
  #gravityInterval = -1;

  /**
   * @type {number}
   */
  #lastLevelIndex = 0;

  /**
   * @type {ControllerGame}
   */
  #controller;

  /**
   * constructor of the game
   * @param {Subject} controller the controller of the game
   */
  constructor(controller) {
    this.#controller = controller;
  }

  get currentLevel() {
    return this.#currentLevel;
  }

  /**
   * start a new game
   * @param {number} levelIndex the index of the level
   */
  newGame(levelIndex) {
    this.#lastLevelIndex = levelIndex;

    if(this.#gravityInterval !== -1)
      clearInterval(this.#gravityInterval);

    this.#currentLevel = this.#controller.getLevel(levelIndex);
    this.#gravityInterval = setInterval(()=>this.#currentLevel.checkGravity(), 220);
    this.#currentLevel.movePlayer(this.#currentLevel.startPoint.x, this.#currentLevel.startPoint.y);
  }
  
  /**
   * restart the current level
   */
  restartGame() {
    this.newGame(this.#lastLevelIndex);
  }

  /**
   * resume a state of the game
   * @param {object} state state to resume 
   */
  resumeState(state) {
    this.#lastLevelIndex = state.levelId;

    if(this.#gravityInterval !== -1)
      clearInterval(this.#gravityInterval);

    const level = new Level(this.#controller, state.moveCount);
    level.loadLevelFromText(state.levelText, state.diamondCountStart, state.diamondCount);
    this.#currentLevel = level;
    this.#gravityInterval = setInterval(()=>this.#currentLevel.checkGravity(), 220);
  }

  /**
   * move the player relatively 
   * @param {number} dX the number of cells to move horizontally
   * @param {number} dY the number of cells to move vertically
   * @param {string} direction 
   */
  movePlayerRelative(dX, dY, direction) {
    if (this.#currentLevel.playerCell)
      this.#currentLevel.movePlayer(this.#currentLevel.playerCell.x+dX, this.#currentLevel.playerCell.y+dY, direction);
  }

  /**
   * check if the level is ended and if so, end the game and return menu if there is no next level
   */
  checkEndGame() {
    if(this.#currentLevel.diamondCount === 0) {
      if (this.#lastLevelIndex+1 == this.#controller.application.levels.length) {
        this.view.showPopup("win", () => {
          this.view.closePopup();
          this.#controller.application.resetState();
          this.#controller.goBackMenu();
        }, () => {});
      }
      else {
        this.newGame(this.#lastLevelIndex + 1);
      }
    }
  }

  /**
   * called when the model is gonna be deleted to remove gravity check interval
   */
  destroy() {
    if (this.#gravityInterval !== -1)
      clearInterval(this.#gravityInterval);
  }

  get lastLevelIndex(){
    return this.#lastLevelIndex;
  }

  get view(){
    return this.#controller.application.view;
  }

}