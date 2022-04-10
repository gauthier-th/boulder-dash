import { Cell } from "../model-cell.js";

/**
 * class representing a exploding cell
 */
export class ExplodeCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "E";
  }

}