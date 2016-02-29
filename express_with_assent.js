var express = require("express");
var fs = require("fs");
var Parser = require('./parser')

var srv = express();
var localMemory = [];

var Rules = require("assent");




function getParamsObject(context) {
    var params = {};

    for (var propt_params in context.params) {
        params[propt_params] = context.params[propt_params];
        //define(params, propt_params, context.params[propt_params]);
    }

    for (var propt_body in context.body) {
        params[propt_body] = context.body[propt_body];
        //define(params, propt_body, context.body[propt_body]);
    }

    for (var propt_query in context.query) {
        params[propt_query] = context.query[propt_query];
        //define(params, propt_query, context.query[propt_query]);
    }

    return params;
}


srv.get("/", function(req, res) {
    res.send("Hello World From Index\n");

});

srv.get("/Main", function(req, res) {
    res.send("Hello World From Main\n");
});

srv.get("/ReadFile", function(req, res) {
    fs.readFile("example_one.txt", function(err, data) {

        if(err) throw err;

        res.send(data.toString());

    });

});

srv.get("/ReadFileJSON", function(req, res) {
    fs.readFile("example_one.txt", function(err, data) {

        if(err) throw err;

        res.setHeader("content-type", "application/json");
        res.send(new Parser().parse(data.toString()));

    });

});


srv.post("/log", function(req, res) {
    
    var input = getParamsObject(req);

    if(input.detail) {
        localMemory.push({
            Date: (new Date()).toString(),
            Title: input.title,
            Detail: input.detail
        });
    }
    res.setHeader("content-type", "application/json");
    res.send({message:"Saved"});

});

srv.get("/log", function(req, res) {

    res.setHeader("content-type", "application/json");
    res.send(localMemory);

});

srv.get("/hassan", function(req, res) {

    var rules = new Rules();
    rules.addMulti([{
        "user_id": {
            required: true,
            int: true
        }
    }, {
        "lat": {
            lat: true
        }
    }, {
        "lon": {
            lon: true
        }
    }, {
        "status": {
            custom: {
                error_message: "Custom error message for field %s",
                method: function (value) {
                    if (value > 10) {
                        return false;
                    }
                    return true;
                }
            }
        }
    }
    ]);

    rules.validate(getParamsObject(req)).then(function(data) {
        res.send(data);
        }).catch(function(error) {
            res.send(error);
        });

    // res.setHeader("content-type", "application/json");
    // res.send(localMemory);
});





srv.listen(8081);
console.log('Server running on port 8081.');

