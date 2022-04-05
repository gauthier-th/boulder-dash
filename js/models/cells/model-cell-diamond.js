import { Cell } from "../model-cell.js";

export class DiamondCell extends Cell{

  constructor() {
    super();
    this.destroyable = true;
  }
  
  getLetter() {
    return "D";
  }

}