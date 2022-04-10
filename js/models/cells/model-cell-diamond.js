import { Cell } from "../model-cell.js";

/**
 * class representing a diamond cell
 */
export class DiamondCell extends Cell{

  constructor() {
    super();
    this.destroyable = true;
  }
  
  getLetter() {
    return "D";
  }

}