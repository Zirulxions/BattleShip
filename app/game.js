//Setting player(s)
var Player = require('./player.js');
var GameStatus = require('./gameStatus.js');

function BattleshipGame(id, idPlayer1, idPlayer2) {
  console.log("HI HI HI");
  this.id = id;
  this.currentPlayer = Math.floor(Math.random() * 2);
  this.winningPlayer = null;
  this.gameStatus = GameStatus.inProgress;
  console.log("test");
  this.players = [new Player(idPlayer1), new Player(idPlayer2)];
}

BattleshipGame.prototype.getPlayerId = function(player) {
  return this.players[player].id;
};

BattleshipGame.prototype.shoot = function(position) {
  var opponent = this.currentPlayer === 0 ? 1 : 0, gridIndex = position.y * Settings.gridCols + position.x;
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

BattleshipGame.prototype.getPlayerId = function(player) {
  return this.players[player].id;
};

BattleshipGame.prototype.switchPlayer = function() {
  this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
};

BattleshipGame.prototype.getGrid = function(player, hideShips) {
  return {
    shots: this.players[player].shots,
    ships: hideShips ? this.players[player].getSunkShips() : this.players[player].ships
  };
};

module.exports = BattleshipGame;
