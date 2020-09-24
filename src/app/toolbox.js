function createToolbox() {
    let toolbox = document.createElement('header');
    toolbox.id = "toolBox";
    // toolbox.className = "container-fluid";
    let toolbarTools = createToolbar();
    toolbarTools.appendChild(createToolsGroup());
    let toolbarOne = createToolbar();
    toolbarOne.appendChild(createColorsGroup());
    toolbarOne.appendChild(createThicknessGroup());

    toolbox.appendChild(toolbarTools);
    toolbox.appendChild(toolbarOne);
    return toolbox;
}

function createColorModal() {
    return loadHTMLPage('/src/pages/colormodal.html');
}

function createMenu() {
    return loadHTMLPage('/src/pages/menu.html');
}

function loadHTMLPage(pagePath) {
    return new Promise((resolve, reject) => {
        fetch(pagePath).
            then(response => {
                response.text().then(textHTML => {
                    resolve(htmlToElems(textHTML));
                });
            });
    });
}

function createToolsGroup() {
    let result = createInputGroup("Tools:");
    let btnGroup = createButtonsGroup();
    btnGroup.appendChild(createFullButton('line', lineButtonClicked, "Line"));
    btnGroup.appendChild(createFullButton('circle', circleButtonClicked, "Circle"));
    btnGroup.appendChild(createFullButton('eraser', eraseButtonClicked, "Eraser"));
    result.appendChild(btnGroup);
    return result;
}

function createFullButton(id, onClickFunction, caption) {
    let btn = createButton();
    btn.id = id;
    btn.onclick = onClickFunction;
    btn.innerText = caption;
    return btn;
}


function createToolbar() {
    let toolbar = createDiv();
    toolbar.className = "btn-toolbar";
    return toolbar;
}

function createThicknessGroup() {
    let result = createInputGroup("Thickness:");
    let btnGroup = createButtonsGroup();
    palette.lines = {};
    paletteDefinition.lines.forEach((thickness, index) => {
        let btn = createButton();
        btn.id = 'thickness' + index;
        palette.lines[btn.id] = thickness;
        btn.innerHTML = thickness;
        btn.onclick = setLinesThickness;
        btnGroup.appendChild(btn);
    });
    result.appendChild(btnGroup);
    return result;
}

function refreshColorsBar() {
    let colorButtonsContainer = document.getElementById('colorButtonsContainer');
    colorButtonsContainer.
        removeChild(document.getElementById('colorButtonsGroup'));
    colorButtonsContainer.appendChild(createColorButtonsGroup());
}

function createColorButtonsGroup() {
    let btnGroup = createButtonsGroup();
    btnGroup.id = 'colorButtonsGroup';
    palette.colors = {};
    paletteDefinition.colors.forEach((color, index) => {
        let btn = createButton();
        btn.id = 'color' + index;
        palette.colors[btn.id] = color;
        btn.style.backgroundColor = color;
        btn.onclick = setDrawingColor;
        btnGroup.appendChild(btn);
    });
    return btnGroup;
}

function createColorsGroup() {
    let result = createInputGroup("Color:");
    result.id = 'colorButtonsContainer';
    result.appendChild(createColorButtonsGroup());
    return result;
}

function createButton() {
    let btn = createDiv();
    btn.type = "button";
    btn.className = "btn btn-outline-primary";
    return btn;
}

function createButtonsGroup() {
    let btnsGroup = createDiv();
    btnsGroup.className = "btn-group";
    btnsGroup.role = "group";
    return btnsGroup;
}

function createInputGroup(text) {
    let iGroup = createDiv();
    iGroup.className = "input-group";
    iGroup.appendChild(createInputGroupPrependText(text))
    return iGroup;
}

function createInputGroupPrependText(text) {
    let prepend = createDiv();
    prepend.className = "input-group-prepend";
    textDiv = createDiv();
    textDiv.className = "input-group-text";
    textDiv.innerHTML = text;
    prepend.appendChild(textDiv);
    return prepend;
}

function createDiv() {
    return document.createElement('div');
}

let pickedColor = '';
function addPickedColor() {
    paletteDefinition.colors.push(pickedColor);
    refreshColorsBar();
}



let paletteDefinition = {
    colors: ['aqua', 'green', 'black', 'lightgrey', 'pink', '#FF4567'],
    lines: [2, 4, 6]
}

let palette = {
    colors: {},
    lines: { line1: 1 }
}

function setDrawingColor(event) {
    pen.fillColor = palette.colors[event.target.id];
}

function setLinesThickness(event) {
    pen.thickness = palette.lines[event.target.id];
}

function htmlToElems(html) {
    let temp = document.createElement('template');
    temp.innerHTML = html;
    return temp.content.childNodes[0];
}