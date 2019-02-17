//run on load
function init() {
    initWordFilters()
    printAllGallery();
}


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

            var tempEl = el.keywords.find(function (key) {
                return (key.includes(txt))
            });
            if (tempEl) { strHtml += convertImgToStr(el); }
        });
        document.querySelector('.gallery-grid').innerHTML = strHtml;
    }
}
function convertImgToStr(picObj) {
    return `<div class="gallery" onclick="onChooseImage(this)"><img src="${picObj.url}" />
        </div>`
}

function onChooseImage(picDiv) { 
    var img = picDiv.innerHTML
    saveToStorage('Img', img.substr(img.indexOf('img/'), 11))
    location.replace(window.location.href.replace('index.html', 'editor.html'))
}

function initWordFilters() {
    for (var i = 1; i <= 5; i++) {
        document.querySelector(`#word-filter${i}`).style.fontSize = `${getRandomInt(6, 24)}px`;
    }
}


function onFilterWord(th) {
    var txt = th.dataset.name;
    var img = picDiv.innerHTML
    saveToStorage('Img', img.substr(img.indexOf('img/'), 11))
    location.replace(window.location.href.replace('index.html', 'editor.html'))
}

function checkForKeyword(txt) {

    var keywords = ['funny', 'angry', 'cat', 'baby,happy'];
    var key = keywords.find(function (el) {
        return el === txt;
    });
    if (key) {
        var elKeyword = document.querySelector(`[data-name~="${key}"]`);
        var currentFontSize = parseFloat(elKeyword.style.fontSize);
        if (currentFontSize < 35) {
            elKeyword.style.fontSize = (currentFontSize + 3) + 'px';
        }
    }
}



function onAboutPress() {

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#the-team").offset().top
    }, 1000);
}