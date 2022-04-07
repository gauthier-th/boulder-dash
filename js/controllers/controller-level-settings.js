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

  loadLevels(){
    for (const levelText of this.#application.levels) {
      const level = new Level(this);
      level.loadLevelFromText(levelText);
      this.#levels.push(level);
    }
  }
  
  get levels(){
    return this.#levels;
  }

}