async function trafficLightsInLoop() {
  const lights = ["green", "amber", "red", "amber", "green", "finished"];

  const promisy = (color) => new Promise((resolve, _reject) => {
    setTimeout(() => {
      console.log(color);
      resolve();
    }, 1000);
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const l of lights) {
    // eslint-disable-next-line no-await-in-loop
    await promisy(l);
  }
}

function trafficLightsNoLoop() {
  const lights = ["green", "amber", "red", "amber", "green", "finished"];

  let index = 0;

  const promisy = (color) => new Promise((resolve, _reject) => {
    setTimeout(() => {
      index += 1;
      console.log(color);
      resolve();
    }, 1000);
  }).then(() => {
    if (lights[index]) {
      promisy(lights[index]);
    }
  });

  promisy(lights[0]);
}

export { trafficLightsInLoop, trafficLightsNoLoop };
