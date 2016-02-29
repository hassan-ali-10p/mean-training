var express = require('express')
  , validate = require('express-validation')
  , http = require('http')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , app = express();

app.use(bodyParser.json())
app.use(cookieParser())

app.set('port', 8081);

var validate = require('express-validation');
var validation = require('./lib/validation/login.js');

app.post('/login', validate(validation.login), function(req, res){
    console.log(validation);
    console.log(req.body);
    res.json(200);
});

app.get('/login1', validate(validation.login1), function(req, res){
    console.log(validation);
    // console.log(req.body);
    console.log("hassan");
    res.json(200);
});

// error handler, required as of 0.3.0
app.use(function(err, req, res, next){
  res.status(400).json(err);
});

http.createServer(app);
app.listen(8081);
console.log("listening on 8080\n")
