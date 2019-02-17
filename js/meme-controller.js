'use strict'

var canvas
var ctx
var gLineHtml
var gNextId = 2
var gCurrLine = 1

function init() {
  let img = document.querySelector('.main-img')
  img.onload = ()=>{
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    // modalOpen()
    gLineHtml = renderFirstLines()
    document.querySelector('#line1').focus()
  }
  img.src  = loadFromStorage('Img')
}

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

function renderFirstLines() {
  let strHtml = []
  let elMainCon = document.querySelector('.main-container')
  for (let i = 0; i < 2; i++) {
    strHtml[i] = addLine(i)
    elMainCon.innerHTML += strHtml[i]
  }
  return strHtml
}

function addLine(id) {
  return `<input class="trans-input text-shadow outline" id="line${id + 1}" type="text" onclick="dragElement(this)" onkeypress="widthGrow(this,event)" contenteditable="true" ${inputStyle(id)} >`
}

function inputStyle(id) {
  let txt = getTxt(id)
  let mainImg = document.querySelector('.main-img')
  txt.width = mainImg.offsetWidth * 0.75
  txt.size = mainImg.offsetHeight / 8
  txt.height = mainImg.offsetHeight
  txt.x = mainImg.offsetLeft + (mainImg.offsetWidth / 2) - (txt.width / 2)
  console.log(mainImg.offsetTop)
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

function uploadImg(ev) {
  var input = ev.target;
  var reader = new FileReader();
  reader.onload = function () {
    var dataURL = reader.result;
    var output = document.querySelector('#main-img');
    output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]);

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

function modalOpen() {
  $('.modal-container').toggle();
}
function onChangeColor(evt) {
  document.querySelector(`#line${gCurrLine}`).style.color = changeColor(evt, gCurrLine-1);
}
function onDecreaseFont() {
  document.querySelector(`#line${gCurrLine}`).style.fontSize = decreaseFont(gCurrLine-1) + 'px'
}
function onIncreaseFont() {
  document.querySelector(`#line${gCurrLine}`).style.fontSize = increaseFont(gCurrLine-1) + 'px'
}
function onChangeFont(value) {
  document.querySelector(`#line${gCurrLine}`).style.fontFamily = value
  changeFont(gCurrLine-1, value);
}
function onTextShadowToggle() {
  var line = document.querySelector(`#line${gCurrLine}`)
  textShadowToggle(gCurrLine-1)
  line.classList.toggle('text-shadow')
}

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

function onGenerate(elLink) {
  debugger
  getTransInputCoords()
  generate();
  var image = canvas.toDataURL("image/png");
  elLink.href = image;
}

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

function saveContent() {
  for (let i = 0; i < gLineHtml.length; i++) {
    let txt = getTxt(i)
    txt.content = document.querySelector(`#line${i + 1}`).value
  }
}

function renderContent() {
  for (let i = 0; i < gLineHtml.length; i++) {
    let txt = getTxt(i)
    document.querySelector(`#line${i + 1}`).value = txt.content
  }
}
