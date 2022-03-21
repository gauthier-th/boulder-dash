import { ControleurBoulderDash } from "./../controleurs/controleurs-boulder-dash.js";
import { VueBoulderDash } from "./../vue/vue-boulder-dash.js";

export class Application {

  #controleurBoulderDash;
  #vueBoulderDash;

  constructor() {
    console.log("Application en route");
    this.#controleurBoulderDash = new ControleurBoulderDash();
    this.#vueBoulderDash = new VueBoulderDash(this.#controleurBoulderDash);
  }

}

document.addEventListener("DOMContentLoaded", () => {
  const app = new Application();
});
