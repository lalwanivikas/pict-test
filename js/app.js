// dom selectors
var canvasContainer = document.querySelector('.canvas-container');
var canvas = new fabric.Canvas('drawing-board');
var guessContainer = document.querySelector('.guess-container');
var input = document.querySelector('.guess-input');
var checkButton = document.querySelector('.guess-check');
var roleContainer = document.querySelector('.role-container');
var scoreContainer = document.querySelector('.score');
var clearButton = document.querySelector('.clear-canvas');

// canvas dimensions
canvas.setWidth(window.innerWidth);
canvas.setHeight(window.innerHeight / 2);

// game variables
var id; // immutable
var wordList = ["car", "tree", "laptop", "table", "cloud", "spectacle", "football"];
var chancesLeft = 3;

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

// clear canvas using click button
clearButton.addEventListener("click", function() {canvas.clear();});

// returns a random word
function generateRandomWord() {return wordList[Math.floor(Math.random() * wordList.length)];}

canvas.on("mouse:up", function(){
  if (gameState.master === id) {
    gameState[id]["canvasString"] = JSON.stringify(canvas.toDatalessJSON());
    upSync();
  }
});

checkButton.addEventListener("click", function() {

  if (input.value.toLowerCase() === gameState.currentWord) {

    chancesLeft = 3;
    alert("Correct answer. Now it is your turn to draw.");
    canvas.clear();

    gameState.master = id;
    gameState.currentWord = generateRandomWord();
    gameState[id].role = "master";
    var slave = (id === "playerA") ? "playerB" : "playerA";
    gameState[slave].role = "slave"
    upSync();
  } else {
    chancesLeft--;
    alert("Incorrect answer. Chances left: " + chancesLeft + ".");
  }

  if (chancesLeft === 0) {

    chancesLeft = 3;
    alert("No more chances left. Now it's your turn to draw.");
    canvas.clear();

    gameState.master = id;
    gameState.currentWord = generateRandomWord();
    gameState[id].role = "master";
    var slave = (id === "playerA") ? "playerB" : "playerA";
    gameState[slave].role = "slave"
    upSync();

    return;
  }

});

function updateMasterUI() {
  if (gameState[id].role === "master") {
    // console.log("I am master!");
    canvasContainer.style.pointerEvents = "auto";
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 4;
    canvas.freeDrawingBrush.color = "#4d85fc";

    guessContainer.style.display = "none";
    roleContainer.innerHTML = "Drawing: " + gameState.currentWord;
  }
}

function updateSlaveUI() {
  if (gameState[id].role === "slave") {
    // console.log("I am slave!");
    // var master = (gameState[id] === "playerA") ? "playerB" : "playerA";
    var currentMaster = gameState.master;
    canvasContainer.style.pointerEvents = "none";
    canvas.loadFromJSON(gameState[currentMaster].canvasString);
    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.renderAll();

    guessContainer.style.display = "inline-block";
    roleContainer.innerHTML = gameState.currentWord.length + " letter word."
  }
}

function updateUI() {
  if (gameState[id].role === "master") {
    // console.log("updating master");
    updateMasterUI();
  } else if (gameState[id].role === "slave") {
    // console.log("updating slave");
    updateSlaveUI();
  }
}

// not being used currently - need to improve code using this function
function upSync() {firebase.database().ref().set(gameState);}

firebase.database().ref().on('value', function(snapshot) {
  if (snapshot.val() !== null) {
    gameState = snapshot.val();
    updateUI();
  }
});

function init() {
  firebase.database().ref().once('value').then(function(snapshot) {
    if (snapshot.val() === null) {
      gameState = emptyState;
      gameState.isAOnline = true;
      gameState.currentWord = generateRandomWord();
      id = "playerA";
      alert("It is your turn to draw.");
      // console.log(1);
      // alert("you are " + id);
    } else {
      gameState = snapshot.val();
      // both players offline
      if (!gameState.isAOnline && !gameState.isBOnline) {
        gameState = emptyState;
        gameState.isAOnline = true;
        gameState.currentWord = generateRandomWord();
        id = "playerA";
        alert("It is your turn to draw.");
        // alert("you are " + id);
        // console.log(2);
      } else if (!gameState.isAOnline && gameState.isBOnline) {
        // player-a offline and player-b online
        // gameState = snapshot.val();
        gameState.isAOnline = true;
        gameState.currentWord = generateRandomWord();
        id = "playerA";
        alert("It is your turn to draw.");
        // alert("you are " + id);
        // console.log(3);
      } else if(gameState.isAOnline && !gameState.isBOnline) {
        // player-a online and player-b offline
        // gameState = snapshot.val();
        gameState.isBOnline = true;
        currentWord = gameState.currentWord;
        id = "playerB";
        alert("It is your turn to guess.");
        // alert("you are " + id);
        // console.log(4);
      } else {
        alert("Game in progress. Please try later.");
        document.write("game in progress. please try later");
        return;
      }
    }
    // console.log(gameState[id]["role"]);
    updateUI();
    upSync();
  });
}

window.onload = init;