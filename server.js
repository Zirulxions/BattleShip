var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

var port = 8000;

app.use(express.static(__dirname + '/public'));

http.listen(port, function(){
  console.log('Lisening... The port is:'  + port);
  console.log('Waiting For Players...');
});

io.on('connection', function(socket) {
  console.log('User Logged..!');
});
