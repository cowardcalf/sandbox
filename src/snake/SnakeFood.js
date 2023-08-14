import { SQUARE_SIZE } from "./constants";
import "./snake.scss";
import { getPlaygroundRect, updateElementPositionById } from "./utils";

class SnakeFood {
  constructor() {
    this.left = 0;
    this.top = 0;
    SnakeFood.init();
  }

  static init() {
    const food = document.createElement("div");
    food.id = "food";
    food.style.width = `${SQUARE_SIZE}px`;
    food.style.height = `${SQUARE_SIZE}px`;
    const playground = document.getElementById("playground");
    playground.appendChild(food);
  }

  getPosition() {
    return { left: this.left, top: this.top };
  }

  draw() {
    updateElementPositionById("food", this.left, this.top);
  }

  generate(snakePositions) {
    const { width, height } = getPlaygroundRect();
    let isValid = false;
    while (!isValid) {
      const left = Math.round((Math.random() * (width - SQUARE_SIZE)) / SQUARE_SIZE)
        * SQUARE_SIZE;
      const top = Math.round((Math.random() * (height - SQUARE_SIZE)) / SQUARE_SIZE)
        * SQUARE_SIZE;
      const foundConflict = snakePositions.find(
        (p) => p.left === left && p.top === top,
      );
      if (!foundConflict) {
        isValid = true;
        this.left = left;
        this.top = top;
        this.draw();
      }
    }
  }
}

export default SnakeFood;
