import { Observer } from "../../patterns/observer.js";

export class ViewGame extends Observer {

  #controllerGame;
  #lastMoveTimestamp = 0;
  #popupType = null;

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

    document.querySelector(".screen-game .buttons .reset").addEventListener("click", () => {
      this.showPopup("reset", () => {
        this.closePopup();
      }, () => {
        this.closePopup();
        console.log("reset");
      });
    });
    document.querySelector(".screen-game .buttons .home").addEventListener("click", () => {
      this.showPopup("home", () => {
        this.closePopup();
      }, () => {
        this.closePopup();
        console.log("home");
      });
    });
  }

  keyDown(e) {
    if (this.#popupType)
      return;
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
    const currentLevel = this.#controllerGame.game.currentLevel;
    const grid = document.getElementById("level-grid");
    for (let i = 0; i < grid.children.length; i++) {
      const line = grid.children.item(i);
      for (let j = 0; j < line.children.length; j++) {
        const cell = line.children.item(j);
        const letter = currentLevel.cells[i][j].getLetter();
        cell.classList.remove("cell-m", "cell-d", "cell-t", "cell-r", "cell-v", "cell-p", "cell-x", "cell-e");
        cell.classList.add(`cell-${letter.toLowerCase()}`);
      }
    }
    document.getElementById("game-infos").innerHTML = `
      <div>Diamonds: ${currentLevel.diamondCountStart - currentLevel.diamondCount}/${currentLevel.diamondCountStart}</div>
      <div>Move count: ${currentLevel.moveCount}</div>
    `;
  }

  showPopup(type, callback1, callback2) {
    this.#popupType = type;
    const popup = document.querySelector("#game-popup");
    const title = document.querySelector("#game-popup .title");

    if (type === "reset") {
      title.innerHTML = "Are you sure to reset the level?";
      document.querySelector("#game-popup .buttons-confirm").innerHTML = `
        <button>Cancel</button>
        <button>Reset</button>
      `;
    }
    else if (type === "home") {
      title.innerHTML = "Are you sure to reset quit?";
      document.querySelector("#game-popup .buttons-confirm").innerHTML = `
        <button>Cancel</button>
        <button>Quit</button>
      `;
    }
    else if (type === "win") {
      title.innerHTML = "Congratulation! You win!";
      document.querySelector("#game-popup .one-button").innerHTML = `
        <button>Cancel</button>
        <button>Quit</button>
      `;
      popup.classList.add("one-button");

      document.querySelector("#game-popup .one-button button:nth-child(1)").addEventListener("click", () => {
        callback1();
      });
    }

    if (type === "reset" || type === "home") {
      document.querySelector("#game-popup .buttons-confirm button:nth-child(1)").addEventListener("click", () => {
        callback1();
      });
      document.querySelector("#game-popup .buttons-confirm button:nth-child(2)").addEventListener("click", () => {
        callback2();
      });
    }

    popup.classList.add("show");
  }
  closePopup() {
    this.#popupType = null;
    const popup = document.querySelector("#game-popup");
    popup.classList.remove("one-button");
    popup.classList.remove("show");
  }

  update() {
    this.showLevel();
  }

  destroy() {
    document.body.removeEventListener('keydown', this.keyDown);
  }
}