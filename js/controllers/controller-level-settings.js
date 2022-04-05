import { Subject } from "../../patterns/subject.js";

export class ControllerLevelSettings extends Subject {

  #application;

  constructor(application) {
    super();
    this.#application = application;
  }

}