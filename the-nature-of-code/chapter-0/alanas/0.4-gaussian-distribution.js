

let excerciseTitle;
export function setup() {
  // Figured out that titles are addable:
  excerciseTitle = createP("0.4 Gaussian Distribution Excercise");
  excerciseTitle.style("width", "640px");
  excerciseTitle.style("font-size", "14pt");
  excerciseTitle.style("font-weight", "bold");

  createCanvas(640, 240);
  background(255);
  noStroke();
  colorMode(HSL);
}

export function draw() {
  const xDeviation = randomGaussian(width/2, width/6);
  const yDeviation = randomGaussian(height/2, height/6);

  const colourDeviation = randomGaussian(215, 20);
  fill(colourDeviation, 255, 80, .750);
  circle(xDeviation, yDeviation, 16);
}


export function cleanup() {
  if (excerciseTitle) excerciseTitle.remove();
  colorMode(RGB);
}


// One thing to write down, I had forgotten how to calculate the standard deviation.
// It's just pythagoras theorem seeing each data entry from the mean as it's own distinct axis/distance.
// (Only difference is the squared distances are averaged, instead of taken as a sum) 

// I guess it's the hypothenuse of the average deviation technically

// Formula just to write out: 
// -(For each entry) Get the squared distances from the mean.
// - get the average of these distances
// - Square root it.
