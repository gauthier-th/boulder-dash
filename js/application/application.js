import { ControllerMenu } from "../controllers/controller-menu.js";
import { ViewMenu } from "../view/view-menu.js";
import { ControllerGame } from "../controllers/controller-game.js";
import { ViewGame } from "../view/view-game.js";
import { ControllerLevelSettings } from "../controllers/controller-level-settings.js";
import { ViewLevelSettings } from "../view/view-level-settings.js";

/**
 * Class representing the application
 */
export class Application {

  /**
   * @type {string}
   */
  #screen;

  /**
   * @type {Subject}
   */
  #controller;

  /**
   * @type {Observer}
   */
  #view;

  /**
   * @type {Level[]}
   */
  #levels = [];

  /**
   * constructor of the application
   */
  constructor() {
    (async () => {
      await this.loadLevels();
      this.changeScreen("menu");
    })();
  }

  /**
   * change the screen
   * @param {string} screen
   * @param {array} settings 
   */
  async changeScreen(screen, settings = {}) {
    if(this.#view != undefined)
      this.#view.destroy();
      
    this.#screen = screen;
    await this.loadTemplate(screen);
    if (this.#screen === "menu") {
      this.#controller = new ControllerMenu(this);
      this.#view = new ViewMenu(this.#controller);
    }
    else if (this.#screen === "game") {
      this.#controller = new ControllerGame(this, settings);
      this.#view = new ViewGame(this.#controller);
    }
    else if (this.#screen === "level-settings") {
      this.#controller = new ControllerLevelSettings(this);
      this.#view = new ViewLevelSettings(this.#controller);
    }
  }

  get view(){
    return this.#view;
  }

  /**
   * load the template
   * @param {string} screen screen template to load 
   */
  async loadTemplate(screen) {
    document.querySelector("game").innerHTML = `<div class="loading">Loading...</div>`;
    const template = await fetch(`/templates/${screen}.html`);
    const templateHTML = await template.text();
    document.querySelector("game").innerHTML = templateHTML;
  }

  /**
   * load levels from local storage and if not found, load default levels
   * @param {boolean} forceReset  if true, reset the levels saved in the local storage 
   */
  async loadLevels(forceReset = false) {
    const lastLevels = localStorage.getItem("levels");
    if (forceReset || lastLevels === null) {
      const levels = await Promise.all([
        fetch("/levels/level-1.txt").then((response) => response.text()),
        fetch("/levels/level-2.txt").then((response) => response.text()),
        fetch("/levels/level-3.txt").then((response) => response.text()),
      ])
      localStorage.setItem("levels", JSON.stringify(levels));
      this.#levels = levels;
    }
    else
      this.#levels = JSON.parse(lastLevels);
  }

  get levels() {
    return this.#levels;
  }

  /**
   * saves levels in the local storage
   * @param {Level[]} levels levels to save
   */
  setLevels(levels) {
    this.#levels = levels;
    localStorage.setItem("levels", JSON.stringify(this.#levels));
  }

  /**
   * reset the state saved
   */
  resetState() {
    localStorage.setItem("state-saved", 0);
    localStorage.setItem("save-level", {});
  }

  /**
   * return if there is a state saved
   * @returns {boolean} true if the game is saved
   */
  isStateSaved() {
    return Boolean(parseInt(localStorage.getItem("state-saved") || '0'));
  }

}

document.addEventListener("DOMContentLoaded", () => {
  const app = new Application();
});
