import { Observer } from "../../patterns/observer.js";

/**
 * class representing a view of the menu
 */
export class ViewMenu extends Observer {

  /**
   * @type {Subject}
   */
  #controllerMenu;

  /**
   * @type {number}
   */
  #selectedButton = 0;

  /**
   * @type {string[]}
   */
  #buttons = ["new-game", "resume-game", "level-settings", "github"];

  /**
   * @param {Subject} controllerMenu the controller of the menu 
   */
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
    
    if(!this.#controllerMenu.application.isStateSaved())
      document.querySelector("button.resume-game").classList.add("disabled");

    this.update();
  }

  /**
   * keyboard event handler
   */
  keyDown(e) {
    if (e.key === "s" || e.key === "ArrowDown" || e.key === "d" || e.key === "ArrowRight") {
      this.#selectedButton = Math.max(0, Math.min(this.#selectedButton + 1, 3));
      this.update();
    }
    else if (e.key === "z" || e.key === "ArrowUp" || e.key === "q" || e.key === "ArrowLeft") {
      this.#selectedButton = Math.max(0, Math.min(this.#selectedButton - 1, 3));
      this.update();
    }
    else if (e.key === "Enter") {
      this.buttonClick(this.#buttons[this.#selectedButton]);
    }
  }

  /**
   * mouse enter event handler
   * @param {*} button the button that was entered 
   */
  mouseEnter(button) {
    this.#selectedButton = this.#buttons.indexOf(button);
    this.update();
  }

  /**
   * button click event handler
   * @param {*} button the button that was clicked
   */
  buttonClick(button) {
    if(button === "resume-game" && !this.#controllerMenu.application.isStateSaved())
      return;
    document.body.removeEventListener('keydown', this.keyDown);
    this.#controllerMenu.buttonClick(button);
  }

  update() {
    document.querySelector("button.new-game").classList.remove("selected");
    document.querySelector("button.resume-game").classList.remove("selected");
    document.querySelector("button.level-settings").classList.remove("selected");
    document.querySelector("button.github").classList.remove("selected");
    document.querySelector(`button.${this.#buttons[this.#selectedButton]}`).classList.add("selected");
  }

}