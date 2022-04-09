import { Subject } from "../../patterns/subject.js";
import { Level } from "../models/model-level.js";

export class ControllerLevelSettings extends Subject {

  #application;
  #levels = [];

  constructor(application) {
    super();
    this.#application = application;
    this.loadLevels();
    this.notify();
  }

  loadLevels() {
    for (const levelText of this.#application.levels) {
      const level = new Level(this);
      level.loadLevelFromText(levelText);
      this.#levels.push(level);
    }
  }

  get levels() {
    return this.#levels;
  }

  moveLevel(levelIndex, direction) {
    const newIndex = levelIndex + direction;
    if (newIndex >= 0 && newIndex < this.#levels.length) {
      const level = this.#levels[levelIndex];
      this.#levels.splice(levelIndex, 1);
      this.#levels.splice(newIndex, 0, level);
      this.notify();
    }
  }

  cancel() {
    this.#application.changeScreen("menu");
  }

  save() {
    this.#application.setLevels(this.#levels.map(level => level.toString()));
    this.#application.changeScreen("menu");
  }

}