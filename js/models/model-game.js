
import { Level } from "./model-level.js";

export class Game { 

  #currentLevel;
  #gravityInterval = -1;
  #lastLevelIndex = 0;
  #controller;

  constructor(controller) {
    this.#controller = controller;
  }

  get currentLevel() {
    return this.#currentLevel;
  }

  newGame(levelIndex) {
    this.#lastLevelIndex = levelIndex;

    if(this.#gravityInterval !== -1)
      clearInterval(this.#gravityInterval);

    this.#currentLevel = this.#controller.getLevel(levelIndex);
    this.#gravityInterval = setInterval(()=>this.#currentLevel.checkGravity(), 220);
    this.#currentLevel.movePlayer(this.#currentLevel.startPoint.x, this.#currentLevel.startPoint.y);
  }
  
  restartGame() {
    this.newGame(this.#lastLevelIndex);
  }

  resumeState(state) {
    this.#lastLevelIndex = state.levelId;

    if(this.#gravityInterval !== -1)
      clearInterval(this.#gravityInterval);

    const level = new Level(this.#controller, state.moveCount);
    level.loadLevelFromText(state.levelText, state.diamondCountStart, state.diamondCount);
    this.#currentLevel = level;
    this.#gravityInterval = setInterval(()=>this.#currentLevel.checkGravity(), 220);
  }

  movePlayerRelative(dX, dY, direction) {
    if (this.#currentLevel.playerCell)
      this.#currentLevel.movePlayer(this.#currentLevel.playerCell.x+dX, this.#currentLevel.playerCell.y+dY, direction);
  }

  checkEndGame() {
    if(this.#currentLevel.diamondCount === 0) {
      if (this.#lastLevelIndex+1 == this.#controller.application.levels.length) {
        setTimeout(() => this.#controller.goBackMenu(), 1000);
      }
      else {
        this.newGame(this.#lastLevelIndex + 1);
      }
    }
  }

  destroy() {
    if (this.#gravityInterval !== -1)
      clearInterval(this.#gravityInterval);
  }

  get lastLevelIndex(){
    return this.#lastLevelIndex;
  }

}