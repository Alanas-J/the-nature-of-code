
export function setup() {
  createCanvas(640, 440);

  background(255);
  stroke(255, 0 , 0);
}

let x = 100;
let y = 100;

export function draw() {
  x = x + 1

  point(x, y);
}

