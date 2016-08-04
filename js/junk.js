// var canvas = new fabric.Canvas('drawing-board');
// var guessContainer = document.querySelector('.guess-container');
// var input = document.querySelector('.guess-input');
// var checkButton = document.querySelector('.guess-check');
// var roleContainer = document.querySelector('.role-container');
// var scoreContainer = document.querySelector('.score');
// var clearButton = document.querySelector('.clear-canvas');

// // testing
// var username = "";
// var wordList = ["a", "b", "c", "d", "e", "f"];
// var currentWord = "a";
// var master = "";
// var masterState = {score: 0, canvas: ""};
// var slave;
// var slaveState = {score: 0, canvas: ""};


// var canvasWidth = window.innerWidth;
// var canvasHeight = window.innerHeight / 2;
// setCanvas(canvasWidth, canvasHeight);

// function setCanvas(width, height) {
//   canvas.setWidth(width);
//   canvas.setHeight(height);
// }

// clearButton.addEventListener("click", function() {
//   canvas.clear();
// });

// function setBlankPlayingArea() {
//   canvas.clear();
//   input.innerHTML = "";
//   roleContainer.innerHTML = "Hello there!"
//   scoreContainer.innerHTML = 0;
// }

// var generateRandomWord = function() {
//   return wordList[Math.floor(Math.random() * 6)];
// }

// function upSyncGameState(_master, _currentWord, _masterState, _slaveState) {
//   firebase.database().ref().set({
//     master: _master,
//     currentWord: _currentWord,
//     masterState: _masterState,
//     slaveState: _slaveState
//   });
// };

// masterUI = {
//   settings: function() {
//     canvas.isDrawingMode = true;
//     canvas.freeDrawingBrush.width = 4;
//     canvas.freeDrawingBrush.color = "#ff0000";

//     guessContainer.style.display = "none";
//     roleContainer.innerHTML = "Drawing: " + currentWord;
//     scoreContainer.innerHTML = masterState.score;
//   }
// }

// slaveUI = {
//   settings: function() {
//     canvas.isDrawingMode = false;

//     guessContainer.style.display = "inline-block";
//     roleContainer.innerHTML = currentWord.length + " letter word.";
//     scoreContainer.innerHTML = slaveState.score;
//   }
// }

// canvas.on("mouse:up", function(){
//   masterState.canvas = JSON.stringify(canvas.toDatalessJSON());
//   upSyncGameState(master, currentWord, masterState, slaveState);
//   console.log(masterState);
// });

// // firebase.database().ref().on('value', function(snapshot) {
// //   slaveUI.settings();
// // });

// function init() {

//   setBlankPlayingArea();

//   username = username || prompt("Please enter your name", "Batman");

//   firebase.database().ref().once('value').then(function(snapshot) {
//     if(snapshot.val() === null) {
//       master = username;
//       currentWord = generateRandomWord();
//       masterState = {score: 0, canvas: ""};
//       slaveState = {score: 0, canvas: ""};
//       upSyncGameState(master, currentWord, masterState, slaveState);
//       masterUI.settings();
//     } else {
//       master = snapshot.val().master;
//       currentWord = snapshot.val().currentWord;
//       masterState = snapshot.val().masterState;
//       slaveState = snapshot.val().slaveState;
//       if (master.toLowerCase() === username.toLowerCase()) {
//         masterUI.settings();
//       } else {
//         slaveUI.settings();
//       }
//     }
//   });

// }

// window.onload = init;

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

Global state:
  >> master: true or false
  >> word

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

DB Structure
{
  isAOnline: true,
  isBOnline: true,
  master: "playerA",
  playerA: {
    id: "playerA",
    role: "master",
    score: 0,
    canvas: ""
  }
  playerB: {
    id: "playerB",
    role: "slave",
    score: 0,
    canvas: ""
  }
}

*/
