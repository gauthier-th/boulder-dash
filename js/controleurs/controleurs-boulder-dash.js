import { Echiquier } from "./../modeles/echiquier.js";
import { Sujet } from "./../../patterns/sujet.js";

export class ControleurBoulderDash extends Sujet {

  #boulderDash;

  constructor() {
    super();
    this.#boulderDash = new Echiquier();
    this.nouvellePartie();
  }

  get boulderDash() {
    return this.#boulderDash;
  }

  nouvellePartie() {
    this.#boulderDash.nouvellePartie();
    this.notifier();
  }

}