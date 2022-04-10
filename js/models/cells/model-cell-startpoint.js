import { Cell } from "../model-cell.js";

/**
 * class representing a start point cell
 */
export class StartPointCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "P";
  }

}