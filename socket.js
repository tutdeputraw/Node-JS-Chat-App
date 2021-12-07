const WebSocket = require('ws');

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
    console.log(message);
    var datastring = message.toString();
    if (datastring.charAt(0) == "{") {
      datastring = datastring.replace(/\'/g, '"');
      var data = JSON.parse(datastring)

      if (data.cmd == 'send') {
        var sender = webSockets[data.senderId]; //check if there is reciever connection
        var receiver = webSockets[data.receiverId];

        if (receiver) {
          var cdata = "{'cmd':'" + data.cmd + "','userid':'"+data.userid+"', 'msgtext':'"+data.msgtext+"'}";
          // receiver.send(cdata);
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