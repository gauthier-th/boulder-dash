import { ControllerBoulderDash } from "../controllers/controller-boulder-dash.js";
import { VueBoulderDash } from "./../vue/vue-boulder-dash.js";

export class Application {

  #controllerBoulderDash;
  #vueBoulderDash;

  constructor() {
    console.log("Application en route");
    this.#controllerBoulderDash = new ControllerBoulderDash();
    this.#vueBoulderDash = new VueBoulderDash(this.#controllerBoulderDash);
  }

}

document.addEventListener("DOMContentLoaded", () => {
  const app = new Application();
});
