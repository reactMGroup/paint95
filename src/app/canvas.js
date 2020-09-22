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

function eraseRect(state) {
    let ctx = state.canvas.getContext("2d");
    let x = adjustedX(state, state.start.x) - state.thickness / 2;
    let y = adjustedY(state, state.start.y) - state.thickness / 2;
    let width = state.thickness;
    let height = state.thickness;
    ctx.clearRect(x, y, width, height);
}

function drawLine(state) {
    let ctx = state.canvas.getContext("2d");
    ctx.strokeStyle = state.fillColor;
    ctx.lineWidth = state.thickness;
    ctx.beginPath();
    ctx.moveTo(adjustedX(state, state.start.x), adjustedY(state, state.start.y));
    ctx.lineTo(adjustedX(state, state.end.x), adjustedY(state, state.end.y));
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