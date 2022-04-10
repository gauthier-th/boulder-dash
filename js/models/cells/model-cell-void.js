import { Cell } from "../model-cell.js";

/**
 * class representing a void cell
 */
export class VoidCell extends Cell{

  constructor() {
    super();
    this.destroyable = true;
  }
  
  getLetter() {
    return "V";
  }

}