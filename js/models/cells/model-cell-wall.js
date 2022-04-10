import { Cell } from "../model-cell.js";

/**
 * class representing a wall cell
 */
export class WallCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "M";
  }

}