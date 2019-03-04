var GameStatus = {
  inProgress: 1,
  gameOver: 2
}

var BattleshipGame = require('./app/game.js');
var GameStatus = require('./app/gameStatus.js');

var Game = (function() {
  console.log("you are inside the game functon");
  var canvas = [], context = [], grid = [],
      gridHeight = 361, gridWidth = 361, gridBorder = 1,
      gridRows = 10, gridCols = 10, markPadding = 10, shipPadding = 3,
      squareHeight = (gridHeight - gridBorder * gridRows - gridBorder) / gridRows,
      squareWidth = (gridWidth - gridBorder * gridCols - gridBorder) / gridCols,
      turn = false, gameStatus, squareHover = { x: -1, y: -1 };

  canvas[0] = document.getElementById('canvas-grid1');    // This player (You)
  canvas[1] = document.getElementById('canvas-grid2');    // Opponent (Other Player)
  context[0] = canvas[0].getContext('2d');
  context[1] = canvas[1].getContext('2d');
  console.log("testing. Done");
};

function initGame() {
  var i;
  gameStatus = GameStatus.inProgress;
  // Create empty grids for player and opponent
  grid[0] = { shots: Array(gridRows * gridCols), ships: [] };
  grid[1] = { shots: Array(gridRows * gridCols), ships: [] };
  for(i = 0; i < gridRows * gridCols; i++) {
    grid[0].shots[i] = 0;
    grid[1].shots[i] = 0;
  };
