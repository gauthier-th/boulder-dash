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

    //
  }

  get game() {
    return this.#game;
  }

  newGame() {
    this.#game.newGame();
    this.notify();
  }

  getLevel(levelNumber) {
    const level = new Level();
    level.loadLevelFromText(this.#application.levels[levelNumber]);
    return level;
  }

  movePlayerRelative(dX, dY){
    this.#game.movePlayerRelative(dX, dY);
    this.notify();
  }
  
}