

export class Sujet {

  #observateurs;

  constructor() {
    this.#observateurs = [];
  }

  ajouterObservateur(observateur) {
    this.#observateurs.push(observateur);
  }

  notifier() {
    for (let observateur of this.#observateurs) {
      observateur.mettreAJour();
    }
  }

}