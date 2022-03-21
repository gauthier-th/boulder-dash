import { Observateur } from "./../../patterns/observateur.js";

export class VueBoulderDash extends Observateur {

  #controleurBoulderDash;

  constructor(controleurBoulderDash) {
    super();
    this.#controleurBoulderDash = controleurBoulderDash;
    this.#controleurBoulderDash.ajouterObservateur(this);
    this.afficherBoulderDash();
    document.querySelector("button").addEventListener("click", () => {
      this.#controleurBoulderDash.nouvellePartie();
    });
  }

  afficherBoulderDash() {
    const grille = this.#controleurBoulderDash.boulderDash.grille;
    console.log(grille);
    console.log(this.#controleurBoulderDash.boulderDash.deplacementsPossibles);
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
          this.#controleurBoulderDash.selectionnerPiece(x, y);
        }
        else {
          console.log(this.#controleurBoulderDash.boulderDash.deplacementsPossibles);
          this.#controleurBoulderDash.deplacerPiece(x, y);
        }
      });
    }
  }

  afficherJoueur() {
    document.getElementById("joueur").innerText = this.#controleurBoulderDash.boulderDash.joueurCourant;
  }

  mettreAJour() {
    this.afficherBoulderDash();
    this.afficherJoueur();
  }

}