import { Observer } from "../../patterns/observer.js";

export class ViewGame extends Observer {

  #controllerGame;

  constructor(controllerGame) {
    super();
    this.#controllerGame = controllerGame;
    this.#controllerGame.addObserver(this);
    this.showLevel();
    // document.querySelector("button").addEventListener("click", () => {
    //   this.#controllerGame.newGame();
    // });
    let body = document.querySelector("body");
    body.addEventListener('keydown', (e) => {
      if (!e.repeat)
        console.log(`first keydown event. key property value is "${e.key}"`);
      else
        console.log(`keydown event repeats. key property value is "${e.key}"`);
    });
  }

  showLevel() {
    const grid = document.getElementById("level-grid");
    grid.innerHTML = '';
    for (let line of this.#controllerGame.game.currentLevel.cells) {
      let ligneHTML = '<div class="line">';
      for (let cell of line) {
        ligneHTML += `<div class="cell cell-${cell.getLetter().toLowerCase()}"></div>`;
      }
      ligneHTML += '</div>';
      grid.innerHTML += ligneHTML;
    }
  }

  update() {
    this.showLevel();
  }

}