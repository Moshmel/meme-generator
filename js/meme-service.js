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
            line: 'first!!',
            size: 60,
            width: 210,
            height: 50,
            align: 'center',
            color: 'black',
            x: 210,
            y: 50,
            isShadow: false,
            font: 'impact',
        },
        {
            line: 'last!!',
            size: 60,
            height: 400,
            width: 210,
            align: 'center',
            color: 'black',
            x: 210,
            y: 400,
            isShadow: true,
            font: 'arial',
        },

    ]
}

function saveImg(img) {
    currImg = img
}

function getImg() {
    return currImg
}


function printPics()
{
    var strHtml=''
gImgs.forEach(function(el) {
    strHtml+=`<img src='${el.url}' width='200' height='200'>`;
  });
  $('.gellery-container' ).html(strHtml);

}

function changeFont(id, value) {
    gMeme.txts[id].font = value;
}
function changeColor(evt, id) {
    debugger;
    gMeme.txts[id].color = evt.target.value;
    console.log('the color is ',evt.target.value)
document.querySelector('#line1').style.color=evt.target.value;
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

// function changeColor(evt, id) {
//     gMeme.txts[id].color = evt.target.value;
//     console.log('color 1', gMeme.txts[id].color);
//     console.log('txt', gMeme.txts)
// }
function decreaseFont(id)
{
    gMeme.txts[id].size -= 2;
}
function increaseFont(id) {
    gMeme.txts[id].size += 2;
}
function changeFont(id,value)
{
    gMeme.txts[id].font = value;
    console.log(gMeme.txts[id].font)
}

function generate()
{
    var elPhoto=document.querySelector('.main-img')
    canvas.width = elPhoto.clientWidth;
    canvas.height = elPhoto.clientHeight;
    console.log(elPhoto.clientWidth)
    console.log(elPhoto.clientHeight)
    ctx.drawImage(elPhoto, 0, 0,elPhoto.clientWidth,elPhoto.clientHeight);



    gMeme.txts.forEach(function(el) {
        console.log(el.line)
        var ctx = canvas.getContext("2d");
        ctx.textAlign = "center"; 
        ctx.font = `50px ${el.font}`;
        if(el.isShadow){
            ctx.shadowColor="black";
            ctx.shadowBlur=20
            ctx.lineWidth=7;
            ctx.strokeText(el.line, el.x, el.y);
            ctx.shadowBlur=0;   
        }
        ctx.lineWidth=1;
        ctx.fillStyle = el.color;

        ctx.fillText(el.line, el.x, el.y);
        
      });
      


}
