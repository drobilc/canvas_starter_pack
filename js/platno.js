function createCanvasElement(container) {
	var canvas = document.createElement("canvas");
	canvas.className = "canvas";
	container.appendChild(canvas);
	return canvas;
}

function createCanvas(container) {
	return new Canvas(container);
}

function Canvas(container) {

	this.element = createCanvasElement(container);
	this.context = this.element.getContext("2d");

	this.mousePosition = new Point(0, 0);
	this.previousMousePosition = new Point(0, 0);
	this.clicked = false;

	this.clear = true;

	this.setSize = function(width, height) {
		this.element.width = width;
		this.element.height = height;
		this.width = width;
		this.height = height;
	}

	this.center = function() {
		return new Point(this.element.width / 2, this.element.height / 2);
	}

	this.loadImage = function(url) {
		var image = new Image();
		image.src = url;
		return image;
	}

	this.startDrawing = function(drawingFunction) {
		this.drawingFunction = drawingFunction.bind(this);
		this.draw();
	}

	this.draw = function() {
		if (this.drawingFunction == undefined)
			return;

		if (this.clear)
			this.context.clearRect(0, 0, this.width, this.height);
		
		this.drawingFunction(this.context);
		requestAnimationFrame(this.draw.bind(this));
	}

	this.context.__proto__.fillCircle = function(p, r) {
		this.beginPath();
		this.arc(p.x, p.y, r, 0, 2 * Math.PI, false);
		this.fill();
	}

	this.context.__proto__.strokeCircle = function(p, r) {
		this.beginPath();
		this.arc(p.x, p.y, r, 0, 2 * Math.PI, false);
		this.stroke();
	}

	this.context.__proto__.drawLine = function(p1, p2) {
		this.beginPath();
		this.moveTo(p1.x, p1.y);
		this.lineTo(p2.x, p2.y);
		this.stroke();
	}

	this.context.__proto__.strokePath = function(points) {
		if (points.length <= 1)
			return;
		
		this.beginPath();
		this.moveTo(points[0].x, points[0].y);
		for (var i = 1; i < points.length; i++) {
			this.lineTo(points[i].x, points[i].y);
		}
		this.stroke();
	}

	this.context.__proto__.strokePolygon = function(points) {
		if (points.length <= 1)
			return;
		
		this.beginPath();
		this.moveTo(points[0].x, points[0].y);
		for (var i = 1; i < points.length; i++) {
			this.lineTo(points[i].x, points[i].y);
		}
		this.lineTo(points[0].x, points[0].y);
		this.stroke();

	}

	this.context.__proto__.fillPolygon = function(points) {
		if (points.length <= 1)
			return;
		
		this.beginPath();
		this.moveTo(points[0].x, points[0].y);
		for (var i = 1; i < points.length; i++) {
			this.lineTo(points[i].x, points[i].y);
		}
		this.lineTo(points[0].x, points[0].y);
		this.fill();

	}

	this.calculateMousePosition = function(event) {
		var rect = event.target.getBoundingClientRect();
		var point = new Point(event.clientX - rect.left, event.clientY - rect.top);
		return point;
	}

	this.addMouseMoveListener = function(mouseMoveListenerFunction) {
		this.mouseMoveListenerFunction = mouseMoveListenerFunction;

		this.element.onmousemove = function(event) {
			this.previousMousePosition = this.mousePosition;
			var point = this.calculateMousePosition(event);
			this.mousePosition = point;
			if (this.mouseMoveListenerFunction)
				this.mouseMoveListenerFunction(point, event);
		}.bind(this);

	}

	this.addMouseDownListener = function(mouseDownListenerFunction) {
		this.mouseDownListenerFunction = mouseDownListenerFunction;

		this.element.onmousedown = function(event) {
			this.previousMousePosition = this.mousePosition;
			var point = this.calculateMousePosition(event);
			this.mousePosition = point;
			this.clicked = true;
			if (this.mouseDownListenerFunction)
				this.mouseDownListenerFunction(point, event);
		}.bind(this);

	}

	this.addMouseUpListener = function(mouseUpListenerFunction) {
		this.mouseUpListenerFunction = mouseUpListenerFunction;

		this.element.onmouseup = function(event) {
			this.previousMousePosition = this.mousePosition;
			var point = this.calculateMousePosition(event);
			this.mousePosition = point;
			this.clicked = false;
			if (this.mouseUpListenerFunction)
				this.mouseUpListenerFunction(point, event);
		}.bind(this);

	}

	this.addMouseUpListener();
	this.addMouseDownListener();
	this.addMouseMoveListener();

}

class Point {
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	distanceTo(point) {
		return Math.sqrt((point.x - this.x) * (point.x - this.x) + (point.y - this.y) * (point.y - this.y));
	}

	offset(x, y) {
		return new Point(this.x + x, this.y + y);
	}

}