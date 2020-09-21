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

function drawLine(state) {
    let ctx = state.canvas.getContext("2d");
    ctx.strokeStyle = state.fillColor;
    ctx.lineWidth = state.thickness;
    ctx.moveTo(adjustedX(state, state.start.x), adjustedY(state, state.start.y));
    ctx.lineTo(adjustedX(state,state.end.x), adjustedY(state, state.end.y));
    ctx.stroke();
}

function adjustedX(state, x) {
    return x * canvasDefaultWidth / getCanvasRectangle(state).width;
}

function adjustedY(state, y) {
    return y * canvasDefaultHeight / getCanvasRectangle(state).height;;
}

function getCanvasRectangle(state) {
    return state.canvas.getBoundingClientRect();
}