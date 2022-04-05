import { Subject } from "../../patterns/subject.js";

export class ControllerMenu extends Subject {

  #application;

  constructor(application) {
    super();
    this.#application = application;
  }

  buttonClick(button) {
    if (button === "new-game")
      this.#application.changeScreen("game");
    else if (button === "level-settings")
      this.#application.changeScreen("level-settings");
  }

  resumeGame() {

  }

  levelSettings() {
    this.#application.changeScreen("level-settings");
  }

}