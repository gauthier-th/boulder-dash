import { Game } from "../models/model-game.js";
import { Subject } from "../../patterns/subject.js";
import { Level } from "../models/model-level.js";

/**
 * Class representing controller of the game.
 */
export class ControllerGame extends Subject {

  /**
   * @type {Application}
   */
  #application;

  /**
   * @type {Game}
   */
  #game;

  /**
   * constructor of the controller
   * @param {Application} application 
   * @param {array[]} settings 
   */
  constructor(application, settings) {
    super();
    this.#application = application;
    this.#game = new Game(this);
    if(settings.action === "resume")
      this.resumeGameState();
    else
      this.newGame();
  }

  get game() {
    return this.#game;
  }

  /**
   * start a new game
   */
  newGame() {
    this.#game.newGame(0);
    this.saveState();
    this.notify();
  }

  /**
   * restart the current level
   */
  restartGame(){
    this.#game.restartGame();
    this.notify();
  }

  /**
   * resume the game state saved in the local storage
   */
  resumeGameState(){
    const state = JSON.parse(localStorage.getItem("save-level"));
    if (state) {
      this.#game = new Game(this);
      this.#game.resumeState(state);
      this.notify();
    }
    else
      this.newGame();
  }

  /**
   * get a level by index
   * @param {number} levelNumber index of the level to get
   * @returns {Level} the level
   */
  getLevel(levelNumber) {
    const level = new Level(this);
    level.loadLevelFromText(this.#application.levels[levelNumber]);
    return level;
  }

  /**
   * move the player relatively and check if the game is over
   * @param {number} dX the number of cells to move horizontally
   * @param {number} dY the number of cells to move vertically
   * @param {string} direction direction of the move 
   */
  movePlayerRelative(dX, dY, direction) {
    this.#game.movePlayerRelative(dX, dY, direction);
    this.notify();
    this.#game.currentLevel.gravityNeedChecking = true;
    this.#game.checkEndGame();
    this.saveState();
  }

  /**
   * return to the home screen
   */
  goBackMenu() {
    this.#game.destroy();
    this.#application.changeScreen("menu");
  }

  /**
   * save the current state of the game in the local storage
   */
  saveState() {
    const state = {
      levelText: this.#game.currentLevel.levelToText(),
      levelId: this.#game.lastLevelIndex,
      diamondCountStart: this.#game.currentLevel.diamondCountStart,
      diamondCount: this.#game.currentLevel.diamondCount,
      moveCount: this.#game.currentLevel.moveCount,
    };
    localStorage.setItem("save-level", JSON.stringify(state));
    localStorage.setItem("state-saved", 1);
  }

  get application(){
    return this.#application;
  }
}