




export function setup() {
  createCanvas(640, 240, WEBGL);
  background(255);
  colorMode(HSB);
  createExcerciseElements(280);

  offset = 0;
}

let noiseMax = 0.1;
export function draw() {
  // With this implementation of perlin noise we don't sum up individual octave noisemaps.
  noiseDetail(octavesSlider.value(), falloffSlider.value());
  const zoom = zoomSlider.value();

  if(movement) offset += 1/zoom;

  const priorNoisemax = noiseMax;
  noiseMax = 0.1;
  beginShape(QUADS);
  stroke(0);
  fill(120);

  background(255);
  translate(0, 0, 0);
  rotateX(1);
  rotateZ(1);
  
  const step = 10
  const width = 200
  for (let x = -width/2; x < width/2; x+=step) {
    for (let z = -width/2; z < width/2; z+=step) {

      const perlinSample = 50*noise((x-width/2)/zoom + offset, (z-height/2)/zoom + offset);
      if (perlinSample > noiseMax) noiseMax = perlinSample;

      fill(map(perlinSample, 0, priorNoisemax, 50, 100));
      vertex(x, z, perlinSample);
      vertex(x+step, z, 50*noise((x+step-width/2)/zoom + offset, (z-height/2)/zoom + offset));
      vertex(x+step, z+step, 50*noise((x+step-width/2)/zoom + offset, (z+step-height/2)/zoom + offset));
      vertex(x, z+step, 50*noise((x-width/2)/zoom + offset, (z+step-height/2)/zoom + offset));
    }
  }
  endShape();
  
  resetMatrix();
}


// Elements
let excerciseTitle;
let controlsContainer;
let buttonsContainer;
let octavesSlider;
let falloffSlider;
let zoomSlider;
let randomizeButton;
let toggleMovementButton;

function createExcerciseElements(ypos) {
  excerciseTitle = createP("0.10 Perlin Noise Landscape");
  excerciseTitle.style("width", "640px");
  excerciseTitle.style("font-size", "14pt");
  excerciseTitle.style("font-weight", "bold");

  controlsContainer = createDiv()
  controlsContainer.style("display", "flex")
  controlsContainer.style("gap", "10px")


  const octavesLabel = createP("Octaves");
  controlsContainer.elt.appendChild(octavesLabel.elt);
  octavesSlider = createSlider(1, 10, 1, 1);
  octavesSlider.size(80);
  controlsContainer.elt.appendChild(octavesSlider.elt);


  const octavesFalloffLabel = createP("Octave Falloff");
  controlsContainer.elt.appendChild(octavesFalloffLabel.elt);
  falloffSlider = createSlider(0, 1, .7, 0.001);
  falloffSlider.size(80);
  controlsContainer.elt.appendChild(falloffSlider.elt);

  const zoomLabel = createP("Zoom");
  controlsContainer.elt.appendChild(zoomLabel.elt);
  zoomSlider = createSlider(1, 500, 50, 1);
  zoomSlider.size(80);
  controlsContainer.elt.appendChild(zoomSlider.elt);


  buttonsContainer = createDiv()
  buttonsContainer.style("display", "flex")
  buttonsContainer.style("gap", "10px")

  randomizeButton = createButton("Randomize Seed");
  randomizeButton.mousePressed(randomizeButtonClicked);
  buttonsContainer.elt.appendChild(randomizeButton.elt);
  toggleMovementButton = createButton("Toggle Movement");
  toggleMovementButton.mousePressed(toggleMovement);
  buttonsContainer.elt.appendChild(toggleMovementButton.elt)
}

function randomizeButtonClicked() {
  noiseSeed(random(0, 1000000));
}

let movement = true;
let offset = 0;
function toggleMovement() {
  movement = !movement;
}


export function cleanup() {
  if (excerciseTitle) excerciseTitle.remove();
  if (controlsContainer) controlsContainer.remove();
  if (buttonsContainer) buttonsContainer.remove();
}