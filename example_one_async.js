var fs = require("fs");
var Parser = require("./parser");

fs.readFile("example_one.txt", function(err, data) {

    if(err) throw err;

    console.log(data.toString());

});
