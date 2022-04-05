import { BoulderDash } from "../models/model-boulder-dash.js";
import { Sujet } from "../../patterns/sujet.js";

export class ControllerBoulderDash extends Sujet {

  #boulderDash;

  constructor() {
    super();
    this.#boulderDash = new BoulderDash();
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