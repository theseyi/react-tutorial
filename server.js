var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var cors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use('/', express.static(path.join(__dirname, '/static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  cors(req, res, next);
});

app.get('/comments', function (req, res) {
  fs.readFile('./static/_comments.json', function (err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function (req, res) {
  fs.readFile('./static/_comments.json', function (err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./static/_comments.json', JSON.stringify(comments, null, 4), function (err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
      if (err) {
        console.log(err);
      }
    });
  });
});

app.listen(3000, function () {
  var serv = this.address();
  console.log('Server started. %s:%s', serv.address, serv.port);
});
