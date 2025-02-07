
let walker;
let excerciseTitle;

// adding on a showcase of bins aswell.
let randomCounts = [];
let randomBins = 100;

export function setup() {
  excerciseTitle = createP("0.6 Walker with Quadratic Probability Steps");
  excerciseTitle.style("width", "640px");
  excerciseTitle.style("font-size", "14pt");
  excerciseTitle.style("font-weight", "bold");

  createCanvas(640, 240);
  background(255);
  walker = new Walker();

  // quadratic bar chart showcase aswell.
  for (let i = 0; i < randomBins; i++) {
    randomCounts[i] = 0;
  }
}

export function draw() {
  // Would've been nicer to tie to the walker's probability but this shows the probability profile
  randomCounts[floor(acceptreject() * randomBins)]++;
  let w = width / randomCounts.length;
  for (let x = 0; x < randomCounts.length; x++) {
    noFill();
    stroke(0, 100, 200, 5)
    rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  }



  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    let step = 5;
    let xstep = acceptreject() * step;
    if (random(-1, 1) < 0) {
      xstep *= -1;
    }
    let ystep = acceptreject() * step;
    if (random(-1, 1) < 0) {
      ystep *= -1;
    }
    this.x += xstep;
    this.y += ystep;
  }
}

// Had to copy this piece from the sample solution to understand what was wanted:
function acceptreject() {
  while (true) {
    // Pick a random value.
    let r1 = random(1);
    // Assign a probability.
    let probability = r1 * r1;
    // Pick a second random value.
    let r2 = random(1);

    if (r2 < probability) {
      return r1;
    }
  }
}

export function cleanup() {
  if (excerciseTitle) excerciseTitle.remove();
}