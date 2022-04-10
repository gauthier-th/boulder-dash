import { Cell } from "../model-cell.js";

/**
 * class representing a player cell
 */
export class PlayerCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "X";
  }

}