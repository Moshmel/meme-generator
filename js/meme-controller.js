'use strict'

var canvas
var ctx
var startX
var startY
var selectedText = -1

function init() {
    initCanvas()
}

function initCanvas() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
}

function changeText(event, txtId) {
    let text = getMemeById(txtId)
    let char = event.key
    if (char === 'Backspace') {
        text = text.substr(0, text.length - 1)
    }
    else if (char.length !== 1) return
    else {
        text += char
    }
    renderCanvas()
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
    handleImageFromInput(ev, renderImg)
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

function renderImg(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function activateMove(ev) {
    isClicked = true
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
}

function deactiveMove() {
    isClicked = false
    selectedText = -1;
}

function getMoveCoords(ev) {
    if (!isClicked) return
    let txts = getTexts()
    txts.forEach((txt,inx)=>{
        if (textHittest(startX, startY, txt)) {
            selectedText = inx;
        }
    })
    coords = { x: ev.offsetX, y: ev.offsetY }
    renderCanvas()
}

function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderImg(getImg())
    let txts = getTexts()
    txts.forEach(txt => {
        ctx.fillText(txt.line, txt.x, txt.y);//////////////////////
    });
}

function modalOpen() {
    $('.modal-container').toggle();
}

function textHittest(x, y, text) {
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
}
