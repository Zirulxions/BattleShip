var socket = io();

$(function() {
  console.log("testing jquery");
  //Connect to server event
  socket.on('connect', function() {
    console.log('Connected to server.');
    $('#disconnected').hide();
    $('#waiting-room').show();
  });

  //Disconect from server event
  socket.on('disconnect', function() {
    console.log('Disconnected from server.');
    $('#waiting-room').hide();
    $('#game').hide();
    $('#disconnected').show();
    console.log("functions executed");
  });

  //Join Game
  socket.on('join', function(gameId) {
    Game.initGame();
    $('#messages').empty();
    $('#disconnected').hide();
    $('#waiting-room').hide();
    $('#game').show();
    $('#game-number').html(gameId);
  });

  //Update Grid and Turn.
  socket.on('update', function(gameState) {

  });

  //Leave game and join waiting room.
  socket.on('leave', function() {
    $('#game').hide();
    $('#waiting-room').show();
  });

});

function sendLeaveRequest(e) {
  e.preventDefault();
  socket.emit('leave');
}
