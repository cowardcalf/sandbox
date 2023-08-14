import { SQUARE_SIZE, DIRECTIONS } from "./constants";
import "./snake.scss";
import { getPlaygroundRect, updateElementPositionById } from "./utils";

const getNewCellPosition = (cell, direction) => {
  const { left, top } = cell;
  let newLeft = left;
  let newTop = top;
  switch (direction) {
    case DIRECTIONS.LEFT:
      newLeft -= SQUARE_SIZE;
      break;
    case DIRECTIONS.RIGHT:
      newLeft += SQUARE_SIZE;
      break;
    case DIRECTIONS.UP:
      newTop -= SQUARE_SIZE;
      break;
    case DIRECTIONS.DOWN:
      newTop += SQUARE_SIZE;
      break;
    default:
      break;
  }
  return { left: newLeft, top: newTop };
};

class Snake {
  constructor() {
    this.body = [];
    this.init();
    this.draw();
  }

  createBodyCell(left, top) {
    const cell = document.createElement("div");
    cell.className = "snakeBodyCell";
    cell.id = `snake${this.body.length}`;
    cell.style.width = `${SQUARE_SIZE}px`;
    cell.style.height = `${SQUARE_SIZE}px`;
    const playground = document.getElementById("playground");
    playground.appendChild(cell);
    this.body.push({ left, top });
  }

  init() {
    const { width, height } = getPlaygroundRect();
    this.createBodyCell(width / 2, height / 2, 0);
    this.createBodyCell(width / 2 + SQUARE_SIZE, height / 2);
  }

  draw() {
    this.body.forEach((c, index) => {
      const id = `snake${index}`;
      updateElementPositionById(id, c.left, c.top);
    });
  }

  getBodyPositions() {
    return this.body;
  }

  checkConflict(position) {
    let hasConflict = false;
    const { width, height } = getPlaygroundRect();
    const { left, top } = position;
    // Out of range ?
    hasConflict = left < 0
      || left > width - SQUARE_SIZE
      || top < 0
      || top > height - SQUARE_SIZE;
    if (!hasConflict) {
      // Hit its body
      hasConflict = Boolean(
        this.body.slice(1).find((c) => c.left === left && c.top === top),
      );
    }
    return hasConflict;
  }

  move(direction, foodPosition) {
    // TODO: create new head and attach the body pop out the last cell
    const head = this.body[0];
    const newHeadPos = getNewCellPosition(head, direction);
    const hasConflict = this.checkConflict(newHeadPos);
    let grown = false;
    if (!hasConflict) {
      // Grow if eat food
      if (
        newHeadPos.left === foodPosition.left
        && newHeadPos.top === foodPosition.top
      ) {
        grown = true;
        const lastCell = this.body.slice(-1)[0];
        this.createBodyCell(lastCell.left, lastCell.top);
      }
      // Move each cells except head and the grown one
      for (let i = this.body.length - (grown ? 2 : 1); i > 0; i -= 1) {
        const prevCell = this.body[i - 1];
        this.body[i] = prevCell;
      }
      // Move head
      this.body[0] = newHeadPos;
      // Draw
      this.draw();
    }
    return { grown, hasConflict };
  }
}

export default Snake;
