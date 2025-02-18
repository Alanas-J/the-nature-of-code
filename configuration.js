
// ==============================
// Load in any file by specifying an import filepath here.
import { setup, draw } from './the-nature-of-code/chapter-0/alanas/0.10-perlin-noise-landscape.js';
// =============================



window.setup = setup;
window.draw = draw;



// ======================================== Below not needed !=====================================================

// An alterate way to set up canvases, would need to use "this." to use the specific p5.js canvas 
// in the draw/setup functions eg. "this.background(220);" 
/*
new p5((canvas) => {
    setup.bind(canvas);
    draw.bind(canvas);
    canvas.setup = setup;
    canvas.draw = draw;
});
*/