
let randomCounts = [];
let randomBins = 20;

let excerciseTitle;


export function setup() {
  excerciseTitle = createP("0.5 Accept-Reject Distribution Example");
  excerciseTitle.style("width", "640px");
  excerciseTitle.style("font-size", "14pt");
  excerciseTitle.style("font-weight", "bold");
  
  createCanvas(640, 240);
  stroke(0);
  fill(127);

  for (let i = 0; i < randomBins; i++) {
    randomCounts[i] = 0;
  }
}

export function draw() {
  background(255);

  let probability1 = floor(random(randomCounts.length));
  let probability2 = floor(random(randomCounts.length));

  // Only accept probabilities where the probability beats the first roll.
  if (probability2 > probability1){
    randomCounts[probability2]++;
  }

  let w = width / randomCounts.length;
  for (let x = 0; x < randomCounts.length; x++) {
    rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  }
}

export function cleanup() {
  if (excerciseTitle) excerciseTitle.remove();
}
