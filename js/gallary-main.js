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
},
{
    id: 11,
    url: 'img/011.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},
{
    id: 12,
    url: 'img/012.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},
{
    id: 13,
    url: 'img/013.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},
{
    id: 14,
    url: 'img/014.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},
{
    id: 15,
    url: 'img/015.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},
{
    id: 16,
    url: 'img/016.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},{
    id: 17,
    url: 'img/017.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},{
    id: 18,
    url: 'img/018.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},{
    id: 19,
    url: 'img/019.jpg',
    keywords: ['wtf', 'stupid', ' angry']
},{
    id: 20,
    url: 'img/020.jpg',
    keywords: ['wtf', 'stupid', ' angry']
}





]

initWordFilters()
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
    checkForKeyword(txt);
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
    var img=picDiv.innerHTML
    saveToStorage('Img',img.substr(img.indexOf('img/'),11))
    location.replace(window.location.href.replace('index.html','editor.html'))
    
}
function initWordFilters()
{
    for(var i=1;i<=5;i++)
    {
        document.querySelector(`#word-filter${i}`).style.fontSize=`${getRandomInt(6,24)}px`;
    }
}
function onFilterWord(th)
{
    var txt=th.dataset.name;
    onSearchImage(txt);
    


}
function checkForKeyword(txt)
{

    var keywords=['funny','angry','cat','baby,happy'];
    var key=keywords.find(function(el) {
         return el===txt;

    });
    if(key)
    {
        var elKeyword=document.querySelector(`[data-name~="${key}"]`);
        var currentFontSize = parseFloat(elKeyword.style.fontSize);
            if(currentFontSize<35)
            {
            elKeyword.style.fontSize=(currentFontSize+3)+'px';
            }
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onAboutPress()
{

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#the-team").offset().top
    }, 1000);
}