

let walker;

export function setup() {
  createCanvas(640, 440);
  // Create the walker.
  walker = new Walker();
  background(255);
}

export function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    // Objects have data.
    this.x = width / 2;
    this.y = height / 2;
  }
  show() {
    stroke(0);
    point(this.x, this.y);
  }

  // This step actually solves excercise 1. it's a skew to right and down.
  step() {
    let rx = random(1);
    let ry = random(1);
    // also allows for 2 axis movement or nothing

    
    if (rx >= .6) { // 40% chance
      this.x++;
    } else if (rx <= .3) { // 30% chance
      this.x--;
      
    }
    // ~.31 to ~.59 are reserved for stalling.


    if (ry >= .6) { // 40% chance
      this.y++;
    } else if (ry <= .3) { // 30% chance
      this.y--;
      
    }
    // ~.31 to ~.59 are reserved for stalling.
  
  
    // Bonus: Adding the modulo operator to wrap around the canvas
    this.x = this.x % width;
    this.y = this.y % height;
  }
}
