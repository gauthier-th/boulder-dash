import { Observer } from "../../patterns/observer.js";

export class ViewMenu extends Observer {

  #controllerMenu;

  constructor(controllerMenu) {
    super();
    this.#controllerMenu = controllerMenu;
    this.#controllerMenu.addObserver(this);
  }

  update() {
  }

}