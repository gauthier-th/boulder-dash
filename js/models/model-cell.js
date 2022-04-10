

/**
 * class representing a cell in the level
 */
export class Cell {

  /**
   * @type {number}
   */
  #x;

  /**
   * @type {number}
   */
  #y;

  /**
   * represent is the cell is destroyable or not
   * @type {boolean}
   */
  #destroyable = false;

  constructor() {
    
  }
  
  /**
   * return the letter representing the cell
   * @returns {string} letter representing the cell
   */
  getLetter() {
    return "";
  }

  /**
   * set the cell position
   * @param {number} x 
   * @param {number} y 
   */
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

  /**
   * called when the player move to this cell
   */
  onDestroy(){

  }

}