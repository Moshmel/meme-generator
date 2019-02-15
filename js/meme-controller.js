'use strict'

var canvas
var ctx

function init() {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  modalOpen()
}
function onFileInputChange(ev) {
  handleImageFromInput(ev, renderImg)
}

//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img)
    img.src = event.target.result;
    //upload img  for global
    currImg = img;
    saveImg(img)
  }
  reader.readAsDataURL(ev.target.files[0]);
}

function renderImg(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
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

function onChangeColor(evt, id) {
  document.querySelector(`#line${id + 1}`).style.color = changeColor(evt, id);
}
function onDecreaseFont(id) {
  document.querySelector(`#line${id + 1}`).style.fontSize = decreaseFont(id) + 'px'
}

function onIncreaseFont(id) {
  document.querySelector(`#line${id + 1}`).style.fontSize = increaseFont(id) + 'px'
}

function onChangeFont(id, value) {
  debugger
  document.querySelector(`#line${id + 1}`).style.fontFamily = value
  changeFont(id, value);
}

function dragElement(elmnt) {
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
    // e.preventDefault();
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
function onTextShadowToggle(evt, id) {

  document.querySelector(`#line${id + 1}`)
  console.log(evt)
  if (textShadowToggle(inx)) {
  }
}

function dragElement(elmnt) {
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

function onGenerate() {
  getTransInputCoords()
  generate();
}
