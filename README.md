# Javascript canvas starter pack

```javascript
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
```

## Creating a canvas element
To create a canvas element, you can call a `createCanvas` function.
It accepts one argument - the element inside which you want to create your canvas.

```javascript
// Create canvas element iside the document body
var canvas = createCanvas(document.body);

// Create canvas element inside div with 'test' id
var div = document.getElementById("test");
var canvas = createCanvas(div);
```

## Canvas object
When you have your canvas created, you can use the following properties and functions.

### Canvas properties
 * `canvas.clear` *boolean* - if set to `true`, the canvas will be cleared before calling drawing function (default `true`)
 * `canvas.mousePosition` *Point* - current position of the cursor on canvas
 * `canvas.previousMousePosition` *Point* - the previous position of the cursor on canvas
 * `canvas.clicked` *boolean* - whether the user clicked on canvas and did not yet release the mouse button

### Canvas functions:
 * `canvas.setSize(width, height)` - sets the width and height of canvas in pixels
 * `canvas.center()` - returns the center point of the canvas of type `Point`
 * `canvas.startDrawing(drawingFunction)` - sets the drawing function that is called repeatedly
 * `canvas.addMouseDownListener(mouseDownFunction)` - sets the function that is called every time user presses with their mouse on canvas
 * `canvas.addMouseMoveListener(mouseMoveFunction)` - sets the function that is called every time user moves their mouse
 * `canvas.addMouseUpListener(mouseUpFunction)` - sets the function that is called every time user releases their mouse on canvas

## Drawing function
To draw on canvas, you first have to create a drawing function and then bind it to the canvas to be drawn.

```javascript
// Drawing function
function draw(context) {
    // Your drawing code here
}

// Binding the function
canvas.startDrawing(draw);
```

The function should accept parameter context, which is a [context object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).
You can use it to draw on your canvas as you normally would.

#### Special functions
Beside standard functions, we also included a few of our own.
 * `context.fillCircle(centerPoint, radius)` - draws a filled circle at `centerPoint` with radius `r`
 * `context.strokeCircle(centerPoint, radius)` - draws a stroked circle at `centerPoint` with radius `r`
 * `context.drawLine(startPoint, endPoint)` - draws a line between `startPoint` and `endPoint`
 * `context.strokePath(points)` - draws a path connecting points in `points` array
 * `context.strokePolygon(points)` - draws a path connecting points in `points` array, but also connects the first and the last point
 * `context.fillPolygon(points)` - draws a filled polygon from points in `points` array

## Mouse functions
You can define your own functions to be executed when user interacts with canvas using his mouse.
First you have to create a function that accepts one or two parameters - the mouse position and [mouse event](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent). Then, you have to bind the function to canvas.

```javascript
function mouseMove(point) {
    // Do something with Point point
}

// Bind the function to canvas
canvas.addMouseMoveListener(mouseMove);
```

## Point object
The *Point* object is a two dimensional point implementation.

### Point properties
 * `point.x` - the x coordinate of a point
 * `point.y` - the y coordinate of a point

### Point functions
 * `point.offset(x, y)` - returns new point that is moved x units to the right and y units down 
 * `point.distance(otherPoint)` - calculates the Euclidean distance from point to *otherPoint*

```javascript
// Create a point object with coordinates (100, 100)
var point = new Point(100, 100);

// Move the point 100 pixels to the right and 50 pixels up
var newPoint = point.offset(100, -50);

// Calculate the distance from point to center
var distance = point.distanceTo(canvas.center());
```