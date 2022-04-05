import { Cell } from "../model-cell.js";

export class RockCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "R";
  }

}