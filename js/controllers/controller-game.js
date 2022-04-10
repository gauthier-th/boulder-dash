import { Game } from "../models/model-game.js";
import { Subject } from "../../patterns/subject.js";
import { Level } from "../models/model-level.js";

export class ControllerGame extends Subject {

  #application;
  #game;

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

  newGame() {
    this.#game.newGame(0);
    this.saveState();
    this.notify();
  }

  restartGame(){
    this.#game.restartGame();
    this.notify();
  }

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

  getLevel(levelNumber) {
    const level = new Level(this);
    level.loadLevelFromText(this.#application.levels[levelNumber]);
    return level;
  }

  movePlayerRelative(dX, dY, direction) {
    this.#game.movePlayerRelative(dX, dY, direction);
    this.notify();
    this.#game.currentLevel.gravityNeedChecking = true;
    this.#game.checkEndGame();
    this.saveState();
  }

  goBackMenu() {
    this.#game.destroy();
    this.#application.changeScreen("menu");
  }

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