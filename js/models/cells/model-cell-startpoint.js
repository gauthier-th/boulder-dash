import { Cell } from "../model-cell.js";

export class StartPointCell extends Cell{

  constructor() {
    super();
  }
  
  getLetter() {
    return "P";
  }

}