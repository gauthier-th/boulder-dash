import { Observer } from "../../patterns/observer.js";

export class ViewLevelSettings extends Observer {

  #controllerLevelSettings;

  constructor(controllerLevelSettings) {
    super();
    this.#controllerLevelSettings = controllerLevelSettings;
    this.#controllerLevelSettings.addObserver(this);
    this.update();

    document.querySelector(".save-buttons .save").addEventListener("click", () => {
      this.#controllerLevelSettings.save();
    });
    document.querySelector(".save-buttons .cancel").addEventListener("click", () => {
      this.#controllerLevelSettings.cancel();
    });
  }

  showLevels() {
    const grid = document.getElementById("levels");
    grid.innerHTML = "";

    const levelCount = this.#controllerLevelSettings.levels.length;
    for (let i = 0; i < levelCount; i++) {
      const level = this.#controllerLevelSettings.levels[i];
      grid.innerHTML += `
        <div class="level-container">
          <div>
            <h3>Level ${i+1 }</h3>
            ${this.formatLevel(level)}
          </div>
          <div class="buttons">
            <button${i === 0 ? " disabled" : ""}>Monter</button$>
            <button${i === levelCount - 1 ? " disabled" : ""}>Descendre</button$>
          </div>
        </div>
      `;
    }

    for (let i = 0; i < levelCount; i++) {
      document.querySelector(`.level-container:nth-child(${i+1}) .buttons button:nth-child(1)`).addEventListener('click', () => {
        this.#controllerLevelSettings.moveLevel(i, -1);
      });
      document.querySelector(`.level-container:nth-child(${i+1}) .buttons button:nth-child(2)`).addEventListener('click', () => {
        this.#controllerLevelSettings.moveLevel(i, 1);
      });
    }
  }

  formatLevel(level) {
    let html = '<div class="level-grid">';
    for (let line of level.cells) {
      let ligneHTML = '<div class="line">';
      for (let cell of line) {
        ligneHTML += `<div class="cell cell-${cell.getLetter().toLowerCase()}"></div>`;
      }
      ligneHTML += '</div>';
      html += ligneHTML;
    }
    html += '</div>';

    return html;
  }

  update() {
    this.showLevels();
  }

}