

export class Game { 

  #currentLevel;
  #gravityInterval;

  constructor(controller) {
    this.#currentLevel = controller.getLevel(0);
    this.#gravityInterval = setInterval(()=>this.#currentLevel.checkGravity(), 200);
  }

  get currentLevel() {
    return this.#currentLevel;
  }

  newGame() {
    this.#currentLevel.movePlayer(this.#currentLevel.startPoint.x, this.#currentLevel.startPoint.y);
  }

  movePlayerRelative(dX, dY, direction) {
    this.#currentLevel.movePlayer(this.#currentLevel.playerCell.x+dX, this.#currentLevel.playerCell.y+dY, direction);
  }
}