import { Observer } from "../../patterns/observer.js";

export class ViewGame extends Observer {

  #controllerGame;
  #lastMoveTimestamp = 0;

  constructor(controllerGame) {
    super();
    this.#controllerGame = controllerGame;
    this.#controllerGame.addObserver(this);
    this.initGrid();
    this.#lastMoveTimestamp = Date.now();
    // document.querySelector("button").addEventListener("click", () => {
    //   this.#controllerGame.newGame();
    // });
    
    this.keyDown = this.keyDown.bind(this);
    document.body.addEventListener('keydown', this.keyDown);
  }

  keyDown(e) {
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
  }

  initGrid() {
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
  showLevel() {
    const grid = document.getElementById("level-grid");
    for (let i = 0; i < grid.children.length; i++) {
      const line = grid.children.item(i);
      for (let j = 0; j < line.children.length; j++) {
        const cell = line.children.item(j);
        const letter = this.#controllerGame.game.currentLevel.cells[i][j].getLetter();
        cell.classList.remove("cell-m", "cell-d", "cell-t", "cell-r", "cell-v", "cell-p", "cell-x", "cell-e");
        cell.classList.add(`cell-${letter.toLowerCase()}`);
      }
    }
  }

  update() {
    this.showLevel();
  }

  destroy() {
    document.body.removeEventListener('keydown', this.keyDown);
  }
}