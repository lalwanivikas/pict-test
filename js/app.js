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

var canvasContainer = document.querySelector('.canvas-container');
var canvas = new fabric.Canvas('drawing-board');
var guessContainer = document.querySelector('.guess-container');
var input = document.querySelector('.guess-input');
var checkButton = document.querySelector('.guess-check');
var roleContainer = document.querySelector('.role-container');
var scoreContainer = document.querySelector('.score');
var clearButton = document.querySelector('.clear-canvas');


var id;
var currentWord;
var wordList = ["tree", "car", "laptop", "table", "cloud", "spectacle"];

canvas.setWidth(window.innerWidth);
canvas.setHeight(window.innerHeight / 2);

var emptyState = {
  isAOnline: false,
  isBOnline: false,
  master: "playerA",
  currentWord: "",
  playerA: {
    id: "playerA",
    role: "master",
    score: 0,
    canvasString: ""
  },
  playerB: {
    id: "playerB",
    role: "slave",
    score: 0,
    canvasString: ""
  }
}

var gameState = {
  isAOnline: false,
  isBOnline: false,
  master: "playerA",
  currentWord: "",
  playerA: {
    id: "playerA",
    role: "master",
    score: 0,
    canvasString: ""
  },
  playerB: {
    id: "playerB",
    role: "slave",
    score: 0,
    canvasString: ""
  }
}

clearButton.addEventListener("click", function() {
  canvas.clear();
});

canvas.on("mouse:up", function(){
  if (gameState.master === id) {
    gameState[id]["canvasString"] = JSON.stringify(canvas.toDatalessJSON());
    firebase.database().ref().set(gameState);
  }
});

checkButton.addEventListener("click", function() {
  if (input.value.toLowerCase() === currentWord) {
    alert("Correct answer. Now it is your turn to draw.");
  }
})

var generateRandomWord = function() {
  return wordList[Math.floor(Math.random() * 6)];
}

function updateMasterUI() {

  console.log("I am master!");

  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 4;
  canvas.freeDrawingBrush.color = "#ff0000";

  guessContainer.style.display = "none";
  roleContainer.innerHTML = "Drawing: " + currentWord;

}

function updateSlaveUI(snapshot) {

  console.log("I am slave!");

  if (snapshot.val() !== null) {
    if (snapshot.val()[id]["role"] == "slave") {

      var master = snapshot.val()["master"];
      canvasContainer.style.pointerEvents = "none";
      canvas.loadFromJSON(snapshot.val()[master].canvasString);
      canvas.isDrawingMode = false;
      canvas.selection = false;
      canvas.renderAll();

      guessContainer.style.display = "inline-block";
      roleContainer.innerHTML = currentWord.length + " letter word."

    }
  }

}

function updateUI(role) {
  if (role === "master") {
    updateMasterUI()
  }
}

firebase.database().ref().on('value', function(snapshot) {
  updateSlaveUI(snapshot);
});

function init() {
  firebase.database().ref().once('value').then(function(snapshot) {
    if (snapshot.val() === null) {
      gameState = emptyState;
      gameState.isAOnline = true;
      currentWord = generateRandomWord();
      gameState.currentWord = currentWord;
      id = "playerA";
      console.log(1);
      alert("you are " + id);
    } else {
      gameState = snapshot.val();
      if (!snapshot.val().isAOnline && !snapshot.val().isBOnline) {
        gameState = emptyState;
        gameState.isAOnline = true;
        currentWord = generateRandomWord();
        gameState.currentWord = currentWord;
        id = "playerA";
        alert("you are " + id);
        console.log(2);
      } else if (!snapshot.val().isAOnline && snapshot.val().isBOnline) {
        gameState = snapshot.val();
        gameState.isAOnline = true;
        currentWord = generateRandomWord();
        gameState.currentWord = currentWord;
        id = "playerA";
        alert("you are " + id);
        console.log(3);
      } else if(snapshot.val().isAOnline && !snapshot.val().isBOnline) {
        gameState = snapshot.val();
        gameState.isBOnline = true;
        currentWord = snapshot.val().currentWord;
        id = "playerB";
        alert("you are " + id);
        console.log(4);
      } else {
        alert("game in progress. please try later");
        document.write("game in progress. please try later");
        return;
      }
    }
    firebase.database().ref().set(gameState);
    updateUI(gameState[id]["role"]);
  });
}

window.onload = init;