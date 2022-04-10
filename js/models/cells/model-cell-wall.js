import { Cell } from "../model-cell.js";

/**
 * class representing a wall
 */
export class WallCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "M";
  }

}