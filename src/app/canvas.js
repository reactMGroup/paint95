function createCanvas() {
    let canvas = document.createElement('canvas');
    canvas.id = "mainCanvas";
    return canvas;
}

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

const canvasDefaultWidth = 300;
const canvasDefaultHeight = 150;

const TYPE_ERASE = 'erase';
const TYPE_LINE = 'line';
const TYPE_CIRCLE = 'circle';

const drawingMethods = {};

drawingMethods[TYPE_ERASE] = eraseRect;
drawingMethods[TYPE_LINE] = drawLine;
drawingMethods[TYPE_CIRCLE] = drawCircle;

function redraw(currentState, drawingPen) {
    clearCanvas();
    currentState.forEach(shape => {
        drawingMethods[shape.type](shape, drawingPen);
    });
}

function eraseRect(rect, pen) {
    let ctx = pen.canvas.getContext("2d");
    let x = adjustedX(pen, rect.start.x) - pen.thickness / 2;
    let y = adjustedY(pen, rect.start.y) - pen.thickness / 2;
    let width = pen.thickness;
    let height = pen.thickness;
    ctx.clearRect(x, y, width, height);
}

function clearAll() {
    state = [];
    redraw(state, pen);
}

function clearCanvas() {
    let ctx = pen.canvas.getContext("2d");
    let x = 0;
    let y = 0;
    let width = getCanvasRectangle(pen).width;
    let height = getCanvasRectangle(pen).height;
    ctx.clearRect(x, y, width, height);
}

function drawCircle(state, pen) {
    let ctx = pen.canvas.getContext("2d");
    ctx.lineWidth = state.thickness;
    ctx.strokeStyle = state.fillColor;
    ctx.beginPath();
    ctx.arc(state.start.x, state.start.y, state.radius, 0, Math.PI * 2, true);
    ctx.stroke();
}
function drawLine(state, pen) {
    let ctx = pen.canvas.getContext("2d");
    ctx.strokeStyle = state.fillColor;
    ctx.lineWidth = state.thickness;
    ctx.beginPath();
    ctx.moveTo(adjustedX(pen, state.start.x), adjustedY(pen, state.start.y));
    ctx.lineTo(adjustedX(pen, state.end.x), adjustedY(pen, state.end.y));
    ctx.stroke();
}

function adjustedX(pen, x) {
    return Math.round(x * canvasDefaultWidth / getCanvasRectangle(pen).width);
}

function adjustedY(pen, y) {
    return Math.round(y * canvasDefaultHeight / getCanvasRectangle(pen).height);
}

function getCanvasRectangle(pen) {
    return pen.canvas.getBoundingClientRect();
}