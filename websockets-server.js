var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = "Allan please add topic";

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');
  socket.send("***The current topic is '" + topic + ".'***");
  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on('message', function(data) {
    console.log('message received: ' + data);

    var message = data;
    var chat_command = data.includes("/topic"); //returns true or false value

    if (chat_command == true) {
      var command = data.split("/topic")[1]; //gets the string after the initial command
      topic = command;
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send("**Topic Has Changed to" + command + "**")
      });
    } else {
      messages.push(data);
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send(data)
      });
    }
  });
});
