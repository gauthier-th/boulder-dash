

export class Game { 

  #currentLevel;
  #gravityInterval = -1;
  #lastLevelIndex = 0;
  #controller;

  constructor(controller) {
    this.#controller = controller;
  }

  get currentLevel() {
    return this.#currentLevel;
  }

  newGame(levelIndex) {
    this.#lastLevelIndex = levelIndex;
    
    if(this.#gravityInterval != -1)
      clearInterval(this.#gravityInterval);

    this.#currentLevel = this.#controller.getLevel(levelIndex);
    this.#gravityInterval = setInterval(()=>this.#currentLevel.checkGravity(), 200);
    this.#currentLevel.movePlayer(this.#currentLevel.startPoint.x, this.#currentLevel.startPoint.y);
  }

  movePlayerRelative(dX, dY, direction) {
    this.#currentLevel.movePlayer(this.#currentLevel.playerCell.x+dX, this.#currentLevel.playerCell.y+dY, direction);
  }

  checkEndGame(){
    if(this.#currentLevel.diamondCount==0){
      if(this.#lastLevelIndex+1 == this.#controller.application.levels.length){
        setTimeout(()=>this.#controller.goBackMenu(), 1000);
      }else{
        this.newGame(this.#lastLevelIndex+1);
      }
    }
  }

  destroy(){
    if(this.#gravityInterval != -1)
      clearInterval(this.#gravityInterval);
  }
}