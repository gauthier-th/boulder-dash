import { Cell } from "../model-cell.js";

export class WallCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "M";
  }

}