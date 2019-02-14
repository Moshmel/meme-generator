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
    keywords: ['dogs', 'friends']
},
{
    id: 4,
    url: 'img/004.jpg',
    keywords: ['baby', 'cute', 'sleep']
},
{
    id: 5,
    url: 'img/005.jpg',
    keywords: ['baby', 'success']
},
{
    id: 6,
    url: 'img/006.jpg',
    keywords: ['cat', 'sleep', 'tierd']
},
{
    id: 7,
    url: 'img/007.jpg',
    keywords: ['ridiclous', 'funny', 'clown']
},
{
    id: 8,
    url: 'img/008.jpg',
    keywords: ['baby', 'funny']
},
{
    id: 9,
    url: 'img/009.jpg',
    keywords: ['haim hecht', 'the man', 'told you']
},
{
    id: 10,
    url: 'img/010.jpg',
    keywords: ['wtf', 'stupid', ' angry']
}
]

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: '',
            size: 60,
            width: 210,
            height: 50,
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

console.log(gImgs)
console.log(gMeme)