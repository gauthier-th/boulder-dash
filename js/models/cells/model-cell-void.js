import { Cell } from "../model-cell.js";

export class VoidCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "V";
  }

}