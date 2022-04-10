import { Subject } from "../../patterns/subject.js";
import { Level } from "../models/model-level.js";

/**
 * Class representing controller of the levels setting menu
 */
export class ControllerLevelSettings extends Subject {

  /**
   * @type {Application}
   */
  #application;

  /**
   * @type {Level[]}
   */
  #levels = [];

    /**
   * constructor of the controller
   * @param {Application} application
   */
  constructor(application) {
    super();
    this.#application = application;
    this.loadLevels();
    this.notify();
  }

  /**
   * load and parse the levels getted from the application
   */
  loadLevels() {
    this.#levels = [];
    for (const levelText of this.#application.levels) {
      const level = new Level(this);
      level.loadLevelFromText(levelText);
      this.#levels.push(level);
    }
  }

  get levels() {
    return this.#levels;
  }

  /**
   * move a level in the level list in a given direction
   * @param {number} levelIndex index of the level to be moved
   * @param {number} direction direction of the move
   */
  moveLevel(levelIndex, direction) {
    const newIndex = levelIndex + direction;
    if (newIndex >= 0 && newIndex < this.#levels.length) {
      const level = this.#levels[levelIndex];
      this.#levels.splice(levelIndex, 1);
      this.#levels.splice(newIndex, 0, level);
      this.notify();
    }
  }

  /**
   * delete a level from the level list
   * @param {number} levelIndex index of the level to be removed
   */
  deleteLevel(levelIndex) {
    if (levelIndex >= 0 && levelIndex < this.#levels.length) {
      this.#levels.splice(levelIndex, 1);
      this.notify();
    }
  }

  /**
   * add a level to the level list from his text representation
   * @param {string} levelText text representation of the level to be added
   */
  addLevel(levelText) {
    try {
      const level = new Level(this);
      level.loadLevelFromText(levelText);
      this.#levels.push(level);
      this.notify();
    }
    catch {}
  }

  cancel() {
    this.#application.changeScreen("menu");
  }

  /**
   * save the levels to the application
   */
  save() {
    this.#application.setLevels(this.#levels.map(level => level.toString()));
    this.#application.resetState();
    this.#application.changeScreen("menu");
  }

  /**
   * reset the levels to the default levels
   */
  async reset() {
    await this.#application.loadLevels(true);
    this.loadLevels();
    this.notify();
  }

}