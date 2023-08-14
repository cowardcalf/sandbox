// function counter() {
//   let seconds = 0;
//   setInterval(() => {
//     seconds += 1;
//     document.getElementById("app")
//        .innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
//   }, 1000);
// }

// counter();

// import { trafficLightsNoLoop } from "./promises/trafficLights";

// trafficLightsNoLoop();

import SnakeGame from "./snake/SnakeGame";

new SnakeGame().run();
