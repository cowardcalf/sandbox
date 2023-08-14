import Snake from "./Snake";
import SnakeFood from "./SnakeFood";
import SnakeMap from "./SnakeMap";
import { DIRECTIONS, DIRECTION_VALUES } from "./constants";

class SnakeGame {
  constructor() {
    this.direction = DIRECTIONS.LEFT;
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  run() {
    document.addEventListener("keydown", (event) => {
      const { code } = event;
      if (DIRECTION_VALUES.includes(code)) {
        this.changeDirection(event.code);
      }
    });
    new SnakeMap(200, 200).draw();
    const food = new SnakeFood();
    const snake = new Snake();
    food.generate(snake.getBodyPositions());

    const interval = setInterval(() => {
      const { grown, hasConflict } = snake.move(this.direction, food.getPosition());
      if (hasConflict) {
        clearInterval(interval);
        alert("Game Over!");
      } else if (grown) {
        food.generate(snake.getBodyPositions());
      }
    }, 500);
  }
}

export default SnakeGame;
