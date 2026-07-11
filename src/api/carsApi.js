import carsData from "../data/cars.json";

const MIN_DELAY_MS = 800;
const MAX_DELAY_MS = 1200;
const FAIL_RATE = 0.2;

function randomDelay() {
  return MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
}

export function getCars() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAIL_RATE) {
        reject(
          new Error(
            "It was not possible to load the cars. Please try again."
          )
        );
        return;
      }

      resolve([...carsData]);
    }, randomDelay());
  });
}
