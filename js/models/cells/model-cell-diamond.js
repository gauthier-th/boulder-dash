import { Cell } from "../model-cell.js";

export class DiamondCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "D";
  }

}