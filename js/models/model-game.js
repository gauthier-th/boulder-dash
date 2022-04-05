

export class Game { 

  #currentLevel;

  constructor(controller) {
   this.#currentLevel = controller.getLevel(0);
  }

  get currentLevel() {
    return this.#currentLevel;
  }

  newGame() {
    this.#currentLevel.movePlayer(this.#currentLevel.startPoint.x, this.#currentLevel.startPoint.y);
  }

  movePlayerRelative(dX, dY) {
    this.#currentLevel.movePlayer(this.#currentLevel.playerCell.x+dX, this.#currentLevel.playerCell.y+dY);
  }
}