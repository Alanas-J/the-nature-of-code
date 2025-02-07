




export function setup() {
  createCanvas(640, 240);
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
  const octaves = octavesSlider.value()
  const falloff = falloffSlider.value()

  if(movement) offset += 1/zoom;

  const priorNoisemax = noiseMax;
  noiseMax = 0.1;
  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      const noiseValue = noise((x-width/2)/zoom + offset, (y-height/2)/zoom + offset)
      if (noiseValue > noiseMax) noiseMax = noiseValue;

      const pixel = color((noiseValue/priorNoisemax) * 70);

      set(x, y, pixel);
    }
  }

  updatePixels();
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
  excerciseTitle = createP("0.8 Perlin Noise Map");
  excerciseTitle.style("width", "640px");
  excerciseTitle.style("font-size", "14pt");
  excerciseTitle.style("font-weight", "bold");

  controlsContainer = createDiv()
  controlsContainer.style("display", "flex")
  controlsContainer.style("gap", "10px")


  const octavesLabel = createP("Octaves");
  controlsContainer.elt.appendChild(octavesLabel.elt);
  octavesSlider = createSlider(1, 10, 6, 1);
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

let movement = false;
let offset = 0;
function toggleMovement() {
  movement = !movement;
}


export function cleanup() {
  if (excerciseTitle) excerciseTitle.remove();
  if (controlsContainer) controlsContainer.remove();
  if (buttonsContainer) buttonsContainer.remove();
}