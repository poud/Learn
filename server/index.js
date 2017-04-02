var path = require('path');
var uuidV4 = require('uuid/v4');
var cookieParser = require('cookie-parser');

var express = require('express')
var app = express()
var expressWs = require('express-ws')(app);
app.use(cookieParser());


var lastPos1;
var lastPos2;

var root = path.join(__dirname, '..');

app.get('/:playerNumber', function (req, res) {
  res.sendFile(path.join(root, 'snake.html'));
})
app.get('/', function (req, res) {
  var uuid = uuidV4();
  res.cookie('uuid', uuid).sendFile(path.join(root, 'menu.html'));
})

app.get('/assets/:name', function (req, res) {
  res.sendFile(path.join(root, 'assets', req.params.name));
})

app.ws('/positions/:playerNumber', function(ws, req) {
  ws.on('message', function(msg) {
    if (req.params.playerNumber === "1"){
      ws.send(lastPos2);
      lastPos1 = msg;
    }else if(req.params.playerNumber === "2"){
      ws.send(lastPos1);
      lastPos2 = msg;
    }
  });
});

var waitingUuidsByWs = {};

app.ws('/find', function(ws, req) {
  waitingUuidsByWs[req.cookies.uuid] = ws,

  ws.on('message', function() {
    var waitingUuids = Object.keys(waitingUuidsByWs);
    if (waitingUuids.length === 2) {
      var counter = 1;
      for (waitingUuid of waitingUuids) {
        console.log('Starting game for', waitingUuid);
        var gameWs = waitingUuidsByWs[waitingUuid];
        gameWs.send(counter++);
      }
      waitingUuids = [];
    }
  });
});

app.listen(4000)
