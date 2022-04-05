import { Observer } from "../../patterns/observer.js";

export class ViewGame extends Observer {

  #controllerGame;

  constructor(controllerGame) {
    super();
    this.#controllerGame = controllerGame;
    this.#controllerGame.addObserver(this);
    this.showBoulderDash();
    document.querySelector("button").addEventListener("click", () => {
      this.#controllerGame.newGame();
    });
  }

  showBoulderDash() {
    const grid = this.#controllerGame.game.grid;
    console.log(grid);
    console.log(this.#controllerGame.game.availableMoves);
    let innerHTML = "";
    for (let i = 0; i < grid.length; i++) {
      innerHTML += "<div class='ligne'>";
      for (let j = 0; j < grid[i].length; j++) {  
        innerHTML += "<div class='case " + (grid[i][j]?.type || "") + " " + (grid[i][j]?.couleur || "") + "' " + (grid[i][j] ? "pion" : "") + " data-x='" + j + "' data-y='" + i + "'></div>";
      }
      innerHTML += "</div>";
    }
    document.querySelector("boulderDash").innerHTML = innerHTML;
    for (let token of document.querySelectorAll(".case")) {
      token.addEventListener("click", () => {
        const x = parseInt(token.getAttribute("data-x"), 10);
        const y = parseInt(token.getAttribute("data-y"), 10);
        console.log(x, y, token.hasAttribute("pion"));
        if (token.hasAttribute("pion")) {
          console.log("sélectionnerpièce")
          this.#controllerGame.selectionnerPiece(x, y);
        }
        else {
          console.log(this.#controllerGame.game.availableMoves);
          this.#controllerGame.deplacerPiece(x, y);
        }
      });
    }
  }

  showPlayer() {
    document.getElementById("joueur").innerText = this.#controllerGame.game.joueurCourant;
  }

  update() {
    this.showBoulderDash();
    this.showPlayer();
  }

}