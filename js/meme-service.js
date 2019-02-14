'use strict';

var isClicked = false
var coords = {}
var x = 0
var y = 0
var currImg

var gImgs = [{
    id: 1,
    url: 'img/001.jpg',
    keywords: ['dutch', 'girl', 'nature']
},
{
    id: 2,
    url: 'img/002.jpg',
    keywords: ['trump', 'angry']
},
{
    id: 3,
    url: 'img/003.jpg',
    keywords: ['dogs','friends']
},
{
    id: 4,
    url: 'img/004.jpg',
    keywords: ['baby','cute','sleep']
},
{
    id: 5,
    url: 'img/005.jpg',
    keywords: ['baby', 'success']
},
{
    id: 6,
    url: 'img/006.jpg',
    keywords: ['cat','sleep','tierd']
},
{
    id: 7,
    url: 'img/007.jpg',
    keywords: ['ridiclous','funny','clown']
},
{
    id: 8,
    url: 'img/008.jpg',
    keywords: ['baby','funny']
},
{
    id: 9,
    url: 'img/009.jpg',
    keywords: ['haim hecht', 'the man', 'told you']
},
{
    id: 10,
    url: 'img/010.jpg',
    keywords: ['wtf','stupid',' angry']
}
]

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: '',
            size: 16,
            align: 'center',
            color: 'black',
            x: 210,
            y: 50,
            isShadow: false,
            font: 'eurofbold',
        },
        {
            line: '',
            size: 60,
            height: 400,
            width: 210,
            align: 'center',
            color: 'black',
            x: 210,
            y: 400,
            isShadow: false,
            font: 'Calibri',
        },

    ]
}

function saveImg(img) {
    currImg = img
}

function getImg() {
    return currImg
}

var strHtml=''
gImgs.forEach(function(el) {
    strHtml+=`<img src='${el.url}' width='200' height='200'>`;
  });
  $('.gellery-container' ).html(strHtml);
  console.log(strHtml)
  function incHeight(id) {
    gMeme.txts[id].y -= 5;
}

function decHeight(id) {
    gMeme.txts[id].y += 5;
}

// function changeText(evt, id) {
//     gMeme.txts[id].line = evt.target.value;
// }

function changeFont(id, value) {
    gMeme.txts[id].font = value;
}

function changeColor(evt, id) {
    gMeme.txts[id].color = evt.target.value;
    console.log('color 1', gMeme.txts[id].color);
    console.log('txt', gMeme.txts)
}
function getNewID() {
    var max = 0;
    gImgs.forEach(function (img) {
        if (img.id > max) max = img.id;
    })
    return max + 1;
}
function addLine() {
    var txt = {
        line: '',
        size: 20,
        height: 400,
        align: 'left',
        color: 'black',
        isShadow: false,
        font: 'Calibri',
    }
    gMeme.txts.push(txt);
    console.log('gMeme.txts', gMeme.txts);
}

function getMemeById(txtId){
    return gMeme.txts[txtId]
}

function getTexts() {
    return gMeme.txts
}