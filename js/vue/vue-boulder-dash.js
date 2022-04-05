import { Observateur } from "./../../patterns/observateur.js";

export class VueBoulderDash extends Observateur {

  #controllerBoulderDash;

  constructor(controllerBoulderDash) {
    super();
    this.#controllerBoulderDash = controllerBoulderDash;
    this.#controllerBoulderDash.ajouterObservateur(this);
    this.afficherBoulderDash();
    document.querySelector("button").addEventListener("click", () => {
      this.#controllerBoulderDash.nouvellePartie();
    });
  }

  afficherBoulderDash() {
    const grille = this.#controllerBoulderDash.boulderDash.grille;
    console.log(grille);
    console.log(this.#controllerBoulderDash.boulderDash.deplacementsPossibles);
    let innerHTML = "";
    for (let i = 0; i < grille.length; i++) {
      innerHTML += "<div class='ligne'>";
      for (let j = 0; j < grille[i].length; j++) {  
        innerHTML += "<div class='case " + (grille[i][j]?.type || "") + " " + (grille[i][j]?.couleur || "") + "' " + (grille[i][j] ? "pion" : "") + " data-x='" + j + "' data-y='" + i + "'></div>";
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
          this.#controllerBoulderDash.selectionnerPiece(x, y);
        }
        else {
          console.log(this.#controllerBoulderDash.boulderDash.deplacementsPossibles);
          this.#controllerBoulderDash.deplacerPiece(x, y);
        }
      });
    }
  }

  afficherJoueur() {
    document.getElementById("joueur").innerText = this.#controllerBoulderDash.boulderDash.joueurCourant;
  }

  mettreAJour() {
    this.afficherBoulderDash();
    this.afficherJoueur();
  }

}