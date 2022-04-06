import { Game } from "../models/model-game.js";
import { Subject } from "../../patterns/subject.js";
import { Level } from "../models/model-level.js";

export class ControllerGame extends Subject {

  #application;
  #game;

  constructor(application) {
    super();
    this.#application = application;
    this.#game = new Game(this);
    this.newGame();
  }

  get game() {
    return this.#game;
  }

  newGame() {
    this.#game.newGame(0);
    this.notify();
  }

  restartGame(){
    this.#game.restartGame();
    this.notify();
  }

  getLevel(levelNumber) {
    const level = new Level(this);
    level.loadLevelFromText(this.#application.levels[levelNumber]);
    return level;
  }

  movePlayerRelative(dX, dY, direction){
    this.#game.movePlayerRelative(dX, dY, direction);
    this.notify();
    this.#game.currentLevel.gravityNeedChecking = true;
    this.#game.checkEndGame();
  }

  goBackMenu(){
    this.#game.destroy();
    this.#application.changeScreen("menu");
  }  

  get application(){
    return this.#application;
  }
}