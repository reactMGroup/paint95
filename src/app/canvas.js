function createCanvas() {
    let canvas = document.createElement('canvas');
    canvas.id = "mainCanvas";
    return canvas;
}

function drawLine(state) {
    var ctx = state.canvas.getContext("2d");
    ctx.strokeStyle = state.fillColor;
    ctx.lineWidth = state.thickness;
    ctx.moveTo(state.start.x, state.start.y);
    ctx.lineTo(state.end.x, state.end.y);
    ctx.stroke();
}