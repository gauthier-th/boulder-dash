import { Observer } from "../../patterns/observer.js";

export class ViewLevelSettings extends Observer {

  controllerLevelSettings;

  constructor(controllerLevelSettings) {
    super();
    this.controllerLevelSettings = controllerLevelSettings;
    this.controllerLevelSettings.addObserver(this);
    this.update();
  }

  showLevels() {
    const grid = document.getElementById("levels");

    for (const level of this.controllerLevelSettings.levels) {
      grid.innerHTML += this.formatLevel(level);
    }
  }

  formatLevel(level){
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