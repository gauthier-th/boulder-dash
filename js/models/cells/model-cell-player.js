import { Cell } from "../model-cell.js";

export class PlayerCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "X";
  }

}