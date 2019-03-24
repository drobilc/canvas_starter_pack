// First, find the body of our html document and insert canvas
var canvas = createCanvas(document.body);

// Set the canvas size to 500px x 500px
canvas.setSize(500, 500);

// Define a function draw, that will be called ~ 60 times per second
function draw(context) {
    // Main drawing code
}

// Tell the canvas to start executing our function draw
canvas.startDrawing(draw);