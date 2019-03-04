var Player = require('./player.js');
var GameStatus = require('./gameStatus.js');

function BattleshipGame(id, idPlayer1, idPlayer2) {
  this.id = id;
  this.currentPlayer = Math.floor(Math.random() * 2);
  this.winningPlayer = null;
  this.gameStatus = GameStatus.inProgress;

  this.players = [new Player(idPlayer1), new Player(idPlayer2)];
}

module.exports = BattleshipGame;
