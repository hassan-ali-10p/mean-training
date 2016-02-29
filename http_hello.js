var http = require("http");

var serv = http.createServer(function(req, res) {
    var url = req.url;
    if(url === "/main") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World From Main\n');
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World From Index\n');
    }
}).on("error", function(e) {
    //log the error
});
serv.listen(8080);
console.log('Server running on port 8080.');
