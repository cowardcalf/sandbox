import "./snake.scss";

class SnakeMap {
  constructor(width, height, inputHandler) {
    this.width = width;
    this.height = height;
    this.inputHandler = inputHandler;
  }

  draw() {
    const playground = document.createElement("div");
    playground.id = "playground";
    playground.style.width = `${this.width}px`;
    playground.style.height = `${this.height}px`;
    playground.addEventListener("keydown", (event) => {
      const { code } = event;
      this.inputHandler(code);
    });
    const app = document.getElementById("app");
    app.appendChild(playground);
  }
}

export default SnakeMap;
