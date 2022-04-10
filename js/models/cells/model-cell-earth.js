import { Cell } from "../model-cell.js";

/**
 * class representing a earth cell
 */
export class EarthCell extends Cell{

  constructor() {
    super();
    this.destroyable = true;
  }
  
  getLetter() {
    return "T";
  }

}