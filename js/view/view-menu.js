import { Observer } from "../../patterns/observer.js";

export class ViewMenu extends Observer {

  #controllerMenu;

  constructor(controllerMenu) {
    super();
    this.#controllerMenu = controllerMenu;
    this.#controllerMenu.addObserver(this);
    document.querySelector("button.new-game").addEventListener("click", () => {
      this.#controllerMenu.clickNewGame();
    });
    document.querySelector("button.resume-game").addEventListener("click", () => {
      this.#controllerMenu.resumeGame();
    });
    document.querySelector("button.level-settings").addEventListener("click", () => {
      this.#controllerMenu.levelSettings();
    });
  }

  update() {
  }

}