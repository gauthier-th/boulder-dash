

export class Subject {

  #observateurs;

  constructor() {
    this.#observateurs = [];
  }

  addObserver(observateur) {
    this.#observateurs.push(observateur);
  }

  notify() {
    for (let observateur of this.#observateurs) {
      observateur.update();
    }
  }

}