import { Cell } from "../model-cell.js";

export class EarthCell extends Cell{

  constructor() {
    super();
    this.destroyable = true;
  }
  
  getLetter() {
    return "T";
  }

}