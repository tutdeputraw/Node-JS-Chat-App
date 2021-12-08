const WebSocket = require('ws');
const request = require('request');

var webSockets = {};

const wss = new WebSocket.Server({
  port: 6060
});

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  var userID = req.url.substr(1); //get userid from URL ip:6060/userid 
  webSockets[userID] = ws; //add new user to the connection list

  console.log('User ' + userID + ' Connected ');

  ws.on('message', message => {
    var datastring = message.toString();
    if (datastring.charAt(0) == "{") {
      datastring = datastring.replace(/\'/g, '"');
      var data = JSON.parse(datastring)

      if (data.cmd == 'send') {
        console.log('message: ' + message);
        var sender = webSockets[data.senderId];
        var receiver = webSockets[data.receiverId];


        request.post('http://192.168.0.7:3000/chat/store').form({
          userId: data.senderId,
          receiverId: data.receiverId,
          message: data.text,
        });


        if (receiver) {
          console.log('datastring: ' + datastring);
          receiver.send(datastring);
          ws.send(data.cmd + ':success');
        } else {
          console.log("No reciever user found.");
          ws.send(data.cmd + ":error");
        }
      } else {
        console.log("No send command");
        ws.send(data.cmd + ":error");
      }
    } else {
      console.log("Non JSON type data");
      ws.send(data.cmd + ":error");
    }
  });

  ws.on('close', function () {
    var userID = req.url.substr(1);
    delete webSockets[userID]; //on connection close, remove reciver from connection list
    console.log('User Disconnected: ' + userID);
  });

  ws.send('connected');
});