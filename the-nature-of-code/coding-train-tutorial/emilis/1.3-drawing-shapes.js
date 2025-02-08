export function setup() {
    createCanvas(400, 400);

}
  
export function draw() {
    background(220,0,200);
    
    let squareLength = 100;
    rect(mouseX, mouseY, 24, 24, squareLength, squareLength)
fill(255)
    strokeWeight(10)
    point (140,120)

    // strokeWeight(10)

    point (150+squareLength+10,120)

    line (24, 24, 250, 300)
}