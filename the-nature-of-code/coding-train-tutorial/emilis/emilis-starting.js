
export function setup() {
  createCanvas(640, 440);

  background(255);
  stroke(124, 244
 , 124);
  strokeWeight(2);
}

let x = 100;
let y = 100;

export function draw() {
  x = x + 1
  
  point(x, y);
}

