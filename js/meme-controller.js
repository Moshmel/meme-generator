'use strict'

var canvas
var ctx
var text = ''



function init() {
    // debugger
    initCanvas()
}

function initCanvas() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
}

function changeText(event) {
    let char = event.key
    if (char === 'Backspace') {
        text = text.substr(0, text.length - 1)
    }
    else if (char.length !== 1) return
    else {
        text += char
    }
    console.log(event)
}


// function renderLines() {
//     var txt = gMeme.txts;
//     ctx.font = txt.size + 'px ' + txt.font;
//     ctx.shadowColor = "black";
//     (txt.isShadow) ? ctx.shadowBlur = 15 : ctx.shadowBlur = 0;
//     ctx.fillStyle = txt.color;
//     txt.textLength = (txt.line.length * txt.size) / 2;
//     ctx.fillText(txt.line, txt.x, txt.y);


// }

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        saveImg(img)
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function renderCanvas(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function activateMove(ev) {
    isClicked = true
}

function deactiveMove() {
    isClicked = false
}

function getMoveCoords(ev) {
    if (!isClicked) return
    coords = { x: ev.offsetX, y: ev.offsetY }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderCanvas(getImg())
    ctx.fillText('Hello MEME', coords.x, coords.y);
}

function modalOpen(){
$('.modal-container').toggle();
}
