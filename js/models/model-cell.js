

export class Cell {

  #x;
  #y;
  #destroyable = false;

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

  get destroyable(){
    return this.#destroyable;
  }

  set destroyable(value){
    this.#destroyable = value;
  }

  onDestroy(){

  }

}