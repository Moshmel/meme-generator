'use strict';

var isClicked = false
var coords = {}
var x = 0
var y = 0
var currImg

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            content: '',
            line: 'first!!',
            size: 25,
            height: 400,
            width: 210,
            align: 'center',
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
            align: 'center',
            color: 'white',
            x: 210,
            y: 400,
            isShadow: true,
            font: 'Impact',
        },
    ]
}

function saveImg(img) {
    currImg = img
}

function getImg() {
    return currImg
}

function printPics() {
    var strHtml = ''
    gImgs.forEach(function (el) {
        strHtml += `<img src='${el.url}' width='200' height='200'>`;
    });
    $('.gellery-container').html(strHtml);

}

function changeFont(id, value) {
    gMeme.txts[id].font = value;
}
function changeColor(evt, id) {
    return gMeme.txts[id].color = evt.target.value;
}

function getNewID() {
    var max = 0;
    gImgs.forEach(function (img) {
        if (img.id > max) max = img.id;
    })
    return max + 1;
}

function addTxt() {
    var txt = {
        content: '',
        line: 'center',
        size: 25,
        height: 400,
        width: 210,
        align: 'center',
        color: 'white',
        x: 210,
        y: 400,
        isShadow: true,
        font: 'Impact',
    }
    gMeme.txts.push(txt);
    console.log('gMeme.txts', gMeme.txts);
}

function decreaseFont(id) {
    gMeme.txts[id].size -= 2;
    return gMeme.txts[id].size
}
function increaseFont(id) {
    gMeme.txts[id].size += 2;
    return gMeme.txts[id].size
}
function getTxt(id) {
    return gMeme.txts[id]
}
function changeFont(id, value) {
    gMeme.txts[id].font = value;
    console.log(gMeme.txts[id].font)
}

function generate() {
    var elPhoto = document.querySelector('.main-img')
    canvas.width = elPhoto.clientWidth;
    canvas.height = elPhoto.clientHeight;
    console.log(elPhoto.clientWidth)
    console.log(elPhoto.clientHeight)
    elPhoto.crossOrigin = "anonymous"
    ctx.drawImage(elPhoto, 0, 0, elPhoto.clientWidth, elPhoto.clientHeight);


    gMeme.txts.forEach(function (el) {
        console.log(el.line)
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

function textShadowToggle(id) {
    return gMeme.txts[id].isShadow = !gMeme.txts[id].isShadow
}


