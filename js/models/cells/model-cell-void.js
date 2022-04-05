import { Cell } from "../model-cell.js";

export class VoidCell extends Cell{

  constructor() {
    super();
    this.destroyable = true;
  }
  
  getLetter() {
    return "V";
  }

}