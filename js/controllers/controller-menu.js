import { Subject } from "../../patterns/subject.js";

/**
 * Class representing controller of the menu
 */
export class ControllerMenu extends Subject {

  /**
   * @type {Application}
   */
  #application;

  /**
   * constructor of the controller
   * @param {Application} application
  */
  constructor(application) {
    super();
    this.#application = application;
  }

  /**
   * on button click
   * @param {string} button button clicked
   */
  buttonClick(button) {
    if (button === "new-game")
      this.#application.changeScreen("game");
    else if(button === "resume-game")
      this.#application.changeScreen("game", {action: "resume"});
    else if (button === "level-settings")
      this.#application.changeScreen("level-settings");
  }

  resumeGame() {

  }

  levelSettings() {
    this.#application.changeScreen("level-settings");
  }

  get application() {
    return this.#application;
  }

}