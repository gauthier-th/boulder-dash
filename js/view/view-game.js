import { Observer } from "../../patterns/observer.js";

export class ViewGame extends Observer {

  #controllerGame;
  #lastMoveTimestamp = 0;

  constructor(controllerGame) {
    super();
    this.#controllerGame = controllerGame;
    this.#controllerGame.addObserver(this);
    this.showLevel();
    this.#lastMoveTimestamp = Date.now();
    // document.querySelector("button").addEventListener("click", () => {
    //   this.#controllerGame.newGame();
    // });
    let body = document.querySelector("body");
    body.addEventListener('keydown', (e) => {
      if (!e.repeat || (e.repeat && Date.now()-this.#lastMoveTimestamp > 100))
      {
        this.#lastMoveTimestamp = Date.now();
        if(["z", "ArrowUp"].includes(e.key)){
          this.#controllerGame.movePlayerRelative(-1, 0, "UP");
        }else if(["q", "ArrowLeft"].includes(e.key)){
          this.#controllerGame.movePlayerRelative(0, -1, "LEFT");
        }else if(["s", "ArrowDown"].includes(e.key)){
          this.#controllerGame.movePlayerRelative(1, 0, "DOWN");
        }else if(["d", "ArrowRight"].includes(e.key)){
          this.#controllerGame.movePlayerRelative(0, 1, "RIGHT");
        }
      }
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