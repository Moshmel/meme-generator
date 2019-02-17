'use strict'

var canvas
var ctx
var gLineHtml
var gNextId = 2
var gCurrLine = 1
var gImgTop = null
var gStartX
var gStartY
var gIsClicked  = false

// Upload first the main pic and then the else 
function init() {
  let img = document.querySelector('.main-img')

  img.onload = ()=>{
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    gLineHtml = renderFirstLines()
    document.querySelector('#line1').focus()
  }

  img.src  = loadFromStorage('Img')
}

// Add another line and focus him
function onAddLine() {
  saveContent()
  let elMainCon = document.querySelector('.main-container')
  addTxt()
  elMainCon.innerHTML += addLine(gNextId)
  renderContent()
  gNextId++
  document.querySelector(`#line${gNextId}`).focus()
  gCurrLine = gNextId
}

// Render the first 2 lines on the pic
function renderFirstLines() {
  let strHtml = []
  let elMainCon = document.querySelector('.main-container')
  for (let i = 0; i < 2; i++) {
    strHtml[i] = addLine(i)
    elMainCon.innerHTML += strHtml[i]
  }
  return strHtml
}

// Make new line html with all properties
function addLine(id) {
   return `<input class="trans-input text-shadow outline" id="line${id + 1}" type="text" ontouchstart="touchElement(event,this)" ontouchmove="moveElement(event, this)" ontouchend="dropElement" (elLine) onclick="dragElement(this)" onkeypress="widthGrow(this)" contenteditable ${inputStyle(id)} >`
}

// Set the line style by object properties
function inputStyle(id) {
  let txt = getTxt(id)
  let mainImg = document.querySelector('.main-img')
  txt.width = mainImg.offsetWidth * 0.75
  txt.size = mainImg.offsetHeight / 8
  txt.height = mainImg.offsetHeight
  txt.x = mainImg.offsetLeft + (mainImg.offsetWidth / 2) - (txt.width / 2)
  
  switch (txt.line) {
    case 'first!!':
      txt.y = Math.abs(mainImg.offsetTop) + (txt.height * 0.05)
      break;
    case 'last!!':
      txt.y = Math.abs(mainImg.offsetTop) + (txt.height * 0.80)
      break;
    case 'center':
      txt.y = Math.abs(mainImg.offsetTop) + (txt.height * 0.43)
      break;
  }

  return `style="top:${txt.y}px;left:${txt.x}px;font-size:${txt.size}px;width:${txt.width}px;"`
}

// Upload a Pic from user and save him on the localStorage
function uploadImg(ev) {
  var input = ev.target;
  var reader = new FileReader();

  reader.onload = ()=>{
    var dataURL = reader.result;
    saveToStorage('Img',dataURL)
    var output = document.querySelector('#main-img');
    output.src = dataURL;
  };

  reader.readAsDataURL(input.files[0]);

}

// Active the user move
function activateMove() {
  gIsClicked  = true
  gStartX = parseInt(e.clientX - offsetX);
  gStartY = parseInt(e.clientY - offsetY);
}

// Deactive the user move
function deactiveMove() {
  gIsClicked  = false
  selectedText = -1;
}

// Change the text color by the user select
function onChangeColor(evt) {
  document.querySelector(`#line${gCurrLine}`).style.color = changeColor(evt, gCurrLine-1);
}

// Decrease the font by the user select
function onDecreaseFont() {
  document.querySelector(`#line${gCurrLine}`).style.fontSize = decreaseFont(gCurrLine-1) + 'px'
}

// Increase the font by the user select
function onIncreaseFont() {
  document.querySelector(`#line${gCurrLine}`).style.fontSize = increaseFont(gCurrLine-1) + 'px'
}

// Change the font by the user select
function onChangeFont(value) {
  document.querySelector(`#line${gCurrLine}`).style.fontFamily = value
  changeFont(gCurrLine-1, value); //// adding 1 more font
} 

// Toggle shadow on the text
function onTextShadowToggle() {
  var line = document.querySelector(`#line${gCurrLine}`)
  textShadowToggle(gCurrLine-1)
  line.classList.toggle('text-shadow')
}

// Drag the element by touch
function touchElement(e,elLine) {
  e = e || window.event;
  e.preventDefault();
  elLine.focus()
  gStartX = parseInt(e.changedTouches[0].clientX)
  gStartY = parseInt(e.changedTouches[0].clientY)
}

// Move the element by touch
function moveElement(e, elLine) {
  e = e || window.event;
  e.preventDefault();
  elLine.style.top = (e.touches[0].pageY) - (elLine.clientHeight / 2) + 'px';
  elLine.style.left = (e.touches[0].pageX) - (elLine.clientWidth / 2) + 'px';
}

// Drop the element by touch
function dropElement(elLine) {
  elLine.focus()
}

// Drag and Drop with mouse
function dragElement(elmnt) {
  gCurrLine = parseInt((elmnt.id).substr((elmnt.id).length - 1))
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// When the user click on download button render the pic with the lines on canvas and download him 
function onDownload(elLink) {
  getTransInputCoords()
  drawMeme();
  var image = canvas.toDataURL();
  elLink.href = image;
}

// Get the top of the img when the menu is open 
function getLineTop(){
  gImgTop = document.querySelector(`.main-img`).y
}

//  Move the line to his new pos because the menu move him 
function moveLine(){
  let spaceBetween = parseInt(document.querySelector(`.main-img`).y - gImgTop)

  for (let i = 0; i < gLineHtml.length; i++) {
    let txt = getTxt(i)
    let elLine = document.querySelector(`#line${i+1}`)
    let top = parseInt(elLine.style.top.substring(0,elLine.style.top.length-2))
    elLine.style.top = spaceBetween + top + 'px'
    txt.y = spaceBetween + top
  }
}

// Calc the width of the line by his text and font size
function widthGrow(elLine) {
  let lineId = (elLine.id).substr((elLine.id).length - 1) - 1
  let txt = getTxt(lineId)
  let width = elLine.offsetWidth

  if (elLine.value === '') {
    elLine.style.width = txt.size + (txt.size / 2) + 'px'
    document.querySelector(`#line${lineId + 1}`).classList.remove('outline')
  }
  else elLine.style.width = width + (txt.size / 2) + 'px'
}

// Save the lines content if the user add another line
function saveContent() {
  for (let i = 0; i < gLineHtml.length; i++) {
    let txt = getTxt(i)
    txt.content = document.querySelector(`#line${i + 1}`).value
  }
}

// Render the lines content
function renderContent() {
  for (let i = 0; i < gLineHtml.length; i++) {
    let txt = getTxt(i)
    document.querySelector(`#line${i + 1}`).value = txt.content
  }
}
