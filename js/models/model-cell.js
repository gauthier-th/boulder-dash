

export class Cell {

  #x;
  #y;

  constructor() {
    
  }
  
  getLetter() {
    return "";
  }

  setPosition(x, y){
    this.#x = x;
    this.#y = y;
  }

  get x() {
      return this.#x;
  }

  get y(){
      return this.#y;
  }

}