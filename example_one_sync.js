var fs = require("fs");
var fileData = fs.readFileSync("example_one.txt");
console.log(fileData.toString());
