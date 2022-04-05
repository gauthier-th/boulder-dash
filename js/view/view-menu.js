import { Observer } from "../../patterns/observer.js";

export class ViewMenu extends Observer {

  #controllerMenu;
  #selectedButton = 0;
  #buttons = ["new-game", "resume-game", "level-settings"];

  constructor(controllerMenu) {
    super();
    this.#controllerMenu = controllerMenu;
    this.#controllerMenu.addObserver(this);

    for (let button of this.#buttons) {
      const buttonElement = document.querySelector(`button.${button}`);
      buttonElement.addEventListener("click", () => {
        this.buttonClick(button);
      });
      buttonElement.addEventListener("mouseenter", () => {
        this.mouseEnter(button);
      });
    }

    this.keyDown = this.keyDown.bind(this);
    document.body.addEventListener('keydown', this.keyDown);
    this.update();
  }

  keyDown(e) {
    if (e.key === "s" || e.key === "ArrowDown" || e.key === "d" || e.key === "ArrowRight") {
      this.#selectedButton = Math.max(0, Math.min(this.#selectedButton + 1, 2));
      this.update();
    }
    else if (e.key === "z" || e.key === "ArrowUp" || e.key === "q" || e.key === "ArrowLeft") {
      this.#selectedButton = Math.max(0, Math.min(this.#selectedButton - 1, 2));
      this.update();
    }
    else if (e.key === "Enter") {
      this.buttonClick(this.#buttons[this.#selectedButton]);
    }
  }

  mouseEnter(button) {
    this.#selectedButton = this.#buttons.indexOf(button);
    this.update();
  }

  buttonClick(button) {
    document.body.removeEventListener('keydown', this.keyDown);
    this.#controllerMenu.buttonClick(button);
  }

  update() {
    document.querySelector("button.new-game").classList.remove("selected");
    document.querySelector("button.resume-game").classList.remove("selected");
    document.querySelector("button.level-settings").classList.remove("selected");
    document.querySelector(`button.${this.#buttons[this.#selectedButton]}`).classList.add("selected");
  }

}