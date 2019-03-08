var Player = require('./player.js');
var Settings = require('./settings.js');
var GameStatus = require('./gameStatus.js');

function BattleshipGame(id, idPlayer1, idPlayer2) {
  this.id = id;
  this.currentPlayer = Math.floor(Math.random() * 2);
  this.winningPlayer = null;
  this.gameStatus = GameStatus.inProgress;
  this.players = [new Player(idPlayer1), new Player(idPlayer2)];
}

BattleshipGame.prototype.getPlayerId = function(player) {
  return this.players[player].id;
};

BattleshipGame.prototype.getWinnerId = function() {
  if(this.winningPlayer === null) {
    return null;
  }
  return this.players[this.winningPlayer].id;
};

BattleshipGame.prototype.getLoserId = function() {
  if(this.winningPlayer === null) {
    return null;
  }
  var loser = this.winningPlayer === 0 ? 1 : 0;
  return this.players[loser].id;
};

//Switch turns
BattleshipGame.prototype.switchPlayer = function() {
  this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
};

BattleshipGame.prototype.abortGame = function(player) {
  // give win to opponent
  this.gameStatus = GameStatus.gameOver;
  this.winningPlayer = player === 0 ? 1 : 0;
};

BattleshipGame.prototype.shoot = function(position) {
  var opponent = this.currentPlayer === 0 ? 1 : 0,
      gridIndex = position.y * Settings.gridCols + position.x;
  if(this.players[opponent].shots[gridIndex] === 0 && this.gameStatus === GameStatus.inProgress) {
    // Square has not been shot at yet.
    if(!this.players[opponent].shoot(gridIndex)) {
      // Miss
      this.switchPlayer();
    }
    // Check if game over
    if(this.players[opponent].getShipsLeft() <= 0) {
      this.gameStatus = GameStatus.gameOver;
      this.winningPlayer = opponent === 0 ? 1 : 0;
    }
    return true;
  }
  return false;
};

BattleshipGame.prototype.getGameState = function(player, gridOwner) {
  return {
    turn: this.currentPlayer === player,                 // is it this player's turn?
    gridIndex: player === gridOwner ? 0 : 1,             // which client grid to update (0 = own, 1 = opponent)
    grid: this.getGrid(gridOwner, player !== gridOwner)  // hide unsunk ships if this is not own grid
  };
};

BattleshipGame.prototype.getGrid = function(player, hideShips) {
  return {
    shots: this.players[player].shots,
    ships: hideShips ? this.players[player].getSunkShips() : this.players[player].ships
  };
};

module.exports = BattleshipGame;
