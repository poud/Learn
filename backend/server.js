var express = require('express');
var path = require('path');
var app = express();
var urlencoded = require("body-parser").urlencoded();
var cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ['fds23afs5df5s43adfasdfas2114']
}));

var users = {
  "emil": "emilemil",
  "freekh": "kulfyr",
};

app.get('/login', function (req, res) {
  res.sendFile(path.resolve(__dirname +'/../frontend/login.html'));
});

app.post('/login', urlencoded, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (password && password.length > 2 && users[username] === password) {
    req.session.username = username;
    res.redirect('/snake.html');
  } else {
    res.sendStatus(404);
  }
});

app.get('/logout', urlencoded, function (req, res) {
  delete req.session.username;
  res.redirect("/login");
});

app.get('/api/user', urlencoded, function (req, res) {
  var username = req.session.username;
  res.json({ username: username });
});

app.get('/snake.html', function (req, res) {
  if (req.session && req.session.username) {
    var username = req.session.username;
    console.log("username", username);
    res.sendFile(path.resolve(__dirname +'/../frontend/snake.html'));
  } else {
    res.send("Not logged in!");
  }
});

app.get('/snake.css', function (req, res) {
  res.sendFile(path.resolve(__dirname +'/../frontend/snake.css'));
});

app.get('/snake.js', function (req, res) {
  res.sendFile(path.resolve(__dirname +'/../frontend/snake.js'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
