'use strict';

var x = 0
var y = 0
var gCurrImg

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            content: '',
            line: 'first!!',
            size: 25,
            height: 400,
            width: 210,
            color: 'white',
            x: 210,
            y: 50,
            isShadow: true,
            font: 'Impact',
        }
        ,
        {
            content: '',
            line: 'last!!',
            size: 25,
            height: 400,
            width: 210,
            color: 'white',
            x: 210,
            y: 400,
            isShadow: true,
            font: 'Impact',
        },
    ]
}

// Change the value of the font size for the wanted line obj
function changeFont(id, value) {
    gMeme.txts[id].font = value;
}

// Change the value of the text color for the wanted line obj
function changeColor(evt, id) {
    return gMeme.txts[id].color = evt.target.value;
}

// Add a new line obj
function addTxt() {
    var txt = {
        content: '',
        line: 'center',
        size: 25,
        height: 400,
        width: 210,
        color: 'white',
        x: 210,
        y: 400,
        isShadow: true,
        font: 'Impact',
    }

    gMeme.txts.push(txt);
}

// Decrease the value of the font size for the wanted line obj
function decreaseFont(id) {
    gMeme.txts[id].size -= 2;
    return gMeme.txts[id].size
}

// Increase the value of the font size for the wanted line obj
function increaseFont(id) {
    gMeme.txts[id].size += 2;
    return gMeme.txts[id].size
}

// Send the line obj by his id
function getTxt(id) {
    return gMeme.txts[id]
}

// Change the font family for the wanted line obj
function changeFont(id, value) {
    gMeme.txts[id].font = value;
}

// Render the img with the lines on the canvas
function drawMeme() {
    var elPhoto = document.querySelector('.main-img')
    canvas.width = elPhoto.clientWidth;
    canvas.height = elPhoto.clientHeight;
    elPhoto.crossOrigin = "anonymous"
    ctx.drawImage(elPhoto, 0, 0, elPhoto.clientWidth, elPhoto.clientHeight);

    gMeme.txts.forEach((el) => {
        ctx = canvas.getContext("2d");
        ctx.font = `${el.size}px ${el.font}`;

        if (el.isShadow) {
            ctx.shadowColor = "black";
            ctx.shadowBlur = 7
            ctx.lineWidth = 5;
            ctx.strokeText(el.line, el.x, el.y);
        }
        ctx.lineWidth = 1;
        ctx.fillStyle = el.color;

        ctx.fillText(el.line, el.x, el.y);
    });
}

// Set the correct coords of the line on the img in relate to the img
function getTransInputCoords() {
    gMeme.txts.forEach((txt, inx) => {
        let line = document.querySelector(`#line${inx + 1}`)
        let mainImg = document.querySelector('.main-img')
        txt.height = line.offsetHeight
        txt.width = line.offsetWidth
        txt.x = line.offsetLeft - mainImg.offsetLeft
        txt.y = (line.offsetTop - mainImg.offsetTop) + (txt.height) - (txt.size / (txt.size / 10))
        txt.line = line.value
    })
}

// Toggle text shadow
function textShadowToggle(id) {
    return gMeme.txts[id].isShadow = !gMeme.txts[id].isShadow
}


