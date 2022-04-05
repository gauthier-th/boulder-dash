

export class Game { 

  #currentLevel;

  constructor(controller) {
   this.#currentLevel = controller.getLevel(1);
  }

  get currentLevel() {
    return this.#currentLevel;
  }

  newGame() {
    this.#currentLevel.movePlayer(this.#currentLevel.startPoint.x, this.#currentLevel.startPoint.y);
  }

}