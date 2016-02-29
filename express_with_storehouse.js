var express = require('express')
  , validate = require('express-validation')
  , http = require('http')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , app = express();

var storehouse = require("storehouse");
var Post1 = require("./lib/model/userstorehouse")();
var Post2 = require("./lib/model/userstorehousesql")();

app.use(bodyParser.json())
app.use(cookieParser())

app.set('port', 8081);

app.post('/login', function(req, res){
    res.json(200);
});

app.get('/login1', function(req, res){
  var insert_obj = {
    _id: 2,
    name: "Post2"
  }

  Post1(insert_obj).save().then(function(data){console.log(data)});
  console.log("sami\n")
    res.json(200);
});

app.get('/login2', function(req, res){
  var insert_obj = {
    post_id: 5,
    name: "Posting5"
  }

  Post2(insert_obj).save().then(function(data){console.log(data)});
  // console.log(Post2);
    res.json(200);
});

app.get('/login3', function(req, res){
  var insert_obj = {
    id: 5,
    postingcol: "Posting5"
  }

  Post2(insert_obj).save().then(function(data){console.log(data)});
  // console.log(Post2);
    res.json(200);
});

app.get('/login4', function(req, res){

  new Post2().find().then(function(data) {
                res.send(data);
            });
});

app.get('/login5', function(req, res){
  new Post1().find({_id: 1}).then(function(data) {
                res.send(data);
            });
});

// error handler, required as of 0.3.0
app.use(function(err, req, res, next){
  res.status(400).json(err);
});

http.createServer(app);
app.listen(8081);
console.log("listening on 8081\n");
console.log("Hassan\n");
