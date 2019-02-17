'use strict';


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


//picture show
printAllGallery();

function printAllGallery() {
    var strHtml = '';
    gImgs.forEach(function (el) {
        strHtml += convertImgToStr(el);
    });
    document.querySelector('.gallery-grid').innerHTML = strHtml;
}

function onSearchImage(txt) {
    document.querySelector('.gallery-grid').innerHTML = '';
    var strHtml = '';
    if (!txt) { printAllGallery(); }
    else {
        gImgs.forEach(function (el) {
            
            var tempEl=el.keywords.find(function (key) {       
                return (key.includes(txt))
            });
            if(tempEl){strHtml += convertImgToStr(el);}
        });
        document.querySelector('.gallery-grid').innerHTML = strHtml;
    }
}
function convertImgToStr(picObj)
{
return`<div class="gallery" onclick="onChooseImage(this)"><img src="${picObj.url}" />
        </div>`
}
function onChooseImage(picDiv)
{   
    debugger
    var img=picDiv.innerHTML
    saveToStorage('Img',img.substr(img.indexOf('img/'),11))
    window.location.href = 'editor.html'
    
}

