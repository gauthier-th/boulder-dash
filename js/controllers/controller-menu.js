import { Subject } from "../../patterns/subject.js";

export class ControllerMenu extends Subject {

  #application;

  constructor(application) {
    super();
    this.#application = application;
  }

  clickNewGame() {
    this.#application.changeScreen("game");
  }

  resumeGame() {

  }

  levelSettings() {
    this.#application.changeScreen("level-settings");
  }

}