var canvas = new fabric.Canvas('drawing-board');
var input = document.querySelector('.guess-input');
var checkButton = document.querySelector('.guess-check');
var roleContainer = document.querySelector('.role-container');
var score = document.querySelector('.score');
var clearButton = document.querySelector('.clear-canvas');

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight / 2;
setCanvas(canvasWidth, canvasHeight);

function setCanvas(width, height) {
  canvas.setWidth(width);
  canvas.setHeight(height);
}

clearButton.addEventListener("click", function() {
  canvas.clear();
});

function setBlankPlayingArea() {
  canvas.clear();
  input.innerHTML = "";
  score.innerHTML = 0;
}

function getCurrentState() {

}

function init() {
  setBlankPlayingArea();
  getCurrentState();
}

window.onload = init;

/*

window onload
  >> decide who is player A and who is B
  >> set canvas dimension based on player-A's phone size
  >> get current canvas state from Firebase and draw it
  >> get current word and draw blanks for it (or text input with label as "4 letter word")
  >> get current score and display it

new game
  >> clear canvas for both players
  >> generate new random word - word visible to player-A and corresponding blanks visible to player-B
  >> update score

on canvas change
  >> sync the changes to Firebase

on word guess
  >> input the word in the blank
  >> on pressing check - checks if the word is correct or not

game states (separate states for both players)
  >> score
  >> canvas state
  >> current word
  >> current role: drawing or guessing
  >> # of chances left if guessing role

Freehand drawing
  >> var canvas = new fabric.Canvas('sheet');
  >> canvas.isDrawingMode = true;
  >> canvas.freeDrawingBrush.width = 4;
  >> canvas.freeDrawingBrush.color = "#ff0000";

*/