import { Game } from "../models/model-game.js";
import { Subject } from "../../patterns/subject.js";

export class ControllerGame extends Subject {

  #application;
  #game;

  constructor(application) {
    super();
    this.#application = application;
    this.#game = new Game();
    this.newGame();
  }

  get game() {
    return this.#game;
  }

  newGame() {
    this.#game.newGame();
    this.notify();
  }

}