import { ControllerMenu } from "../controllers/controller-menu.js";
import { ViewMenu } from "./../view/view-menu.js";
import { ControllerGame } from "../controllers/controller-game.js";
import { ViewGame } from "./../view/view-game.js";
import { ControllerLevelSettings } from "../controllers/controller-level-settings.js";
import { ViewLevelSettings } from "./../view/view-level-settings.js";

export class Application {

  #screen;
  #controller;
  #view;

  constructor() {
    console.log("Application en route");
    this.changeScreen("menu");
  }

  changeScreen(screen) {
    this.#screen = screen;
    if (this.#screen === "menu") {
      this.#controller = new ControllerMenu();
      this.#view = new ViewMenu(this.#controller);
    }
    else if (this.#screen === "game") {
      this.#controller = new ControllerGame();
      this.#view = new ViewGame(this.#controller);
    }
    else if (this.#screen === "level-settings") {
      this.#controller = new ControllerLevelSettings();
      this.#view = new ViewLevelSettings(this.#controller);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new Application();
});
