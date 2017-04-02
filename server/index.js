var express = require('express')
var app = express()
var expressWs = require('express-ws')(app);
var path = require('path');
var lastPos1;
var lastPos2;

var root = path.join(__dirname, '..');

app.get('/:playerNumber', function (req, res) {
  res.sendFile(path.join(root, 'snake.html'));
})
var counter = 0;
app.get('/', function (req, res) {
  res.cookie("counter",counter++).sendFile(path.join(root, 'menu.html'));
})

app.get('/assets/:name', function (req, res) {
  res.sendFile(path.join(root, 'assets', req.params.name));
})

app.ws('/positions/:playerNumber', function(ws, req) {
  console.log(req)
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
app.ws('/find', function(ws, req) {
  ws.on('message', function(msg) {
  });
  counter ++;
  console.log(counter);
});
app.listen(4000)
