import { Cell } from "../model-cell.js";

/**
 * class representing a rock cell
 */
export class RockCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "R";
  }

}