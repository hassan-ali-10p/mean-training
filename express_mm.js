/**
 * Created by faiz on 4/20/15.
 */
var express = require("express");
var userModel = require("./lib/model/user")();
var userModelMysql = require("./lib/model/usermysql");
var commonHelper = require("./lib/helpers/common");
var bodyParser = require('body-parser');
var rules = require('assent');

var srv = express();

srv.use(bodyParser.json());

/* Mongo routes*/

srv.get("/mongo/users", function(req, res) {
    var pagingObject = commonHelper.preparePagingObject(req);
    return userModel.find({}, {first_name: 1, last_name: 1, email: 1}, pagingObject).then(function(output) {
        res.send(output);
    });
});

srv.get("/mongo/users/:userId", function(req, res) {

    var inputObject = commonHelper.getParamsObject(req);
    return userModel.findOne({_id: inputObject.userId}).then(function(output) {
        res.send(output);
    });

});

srv.post("/mongo/users", function(req, res) {
    var newrules = new rules();
    newrules.addMulti([{
        "user_name": {
            length: {
                args: [2, 4]
            },
            required: true
        }
    }]);

    var inputObject = commonHelper.getParamsObject(req);
    newrules.validate(inputObject);
    var objectToSave = new userModel(inputObject);
    return objectToSave.save(function(err) {
        if(err) {
            res.send(err);
        }
        else {
            res.send(objectToSave);
        }

    });
});

srv.put("/mongo/users/:userId", function(req, res) {

    var inputObject = commonHelper.getParamsObject(req);

    return userModel.update({_id: inputObject.userId}, inputObject).then(function(output) {
        res.send(output);
    });
});

srv.delete("/mongo/users/:userId", function(req, res) {

    var inputObject = commonHelper.getParamsObject(req);
    return userModel.remove({_id: inputObject.userId}).then(function(output) {
        res.send(output);
    });

});

/*Mysql routes*/

srv.get("/mysql/users", function(req, res) {

    var pagingObject = commonHelper.preparePagingObject(req);
    return new userModelMysql()
        .getClient()
        .select()
        .offset(parseInt(pagingObject.skip))
        .limit(parseInt(pagingObject.limit))
        .then(function(output) {
        res.send(output);
    });
});

srv.get("/mysql/users/:userId", function(req, res) {

    var inputObject = commonHelper.getParamsObject(req);
    return new userModelMysql().getClient()

        .where({id: parseInt(inputObject.userId)})
        .select()
        .then(function(output) {
        res.send(output);
    });

});

srv.post("/mysql/users", function(req, res) {

    var inputObject = commonHelper.getParamsObject(req);
    var errorMessages = [];
    if(!inputObject.first_name) {
        errorMessages.push("first_name required.")
    }
    if(!inputObject.last_name) {
        errorMessages.push("last_name required.")
    }
    if(!inputObject.email) {
        errorMessages.push("email required.")
    }
    else if(!commonHelper.isValidEmail(inputObject.email)) {
        errorMessages.push("invalid email format.")
    }
    if(errorMessages.length > 0) {
        res.send(errorMessages);
    }
    else {
        return new userModelMysql().getClient()

            .insert(inputObject)
            .then(function(output){
                console.log(output);
            res.send({response: output});
        });
    }

});

srv.put("/mysql/users/:userId", function(req, res) {

    var inputObject = commonHelper.getParamsObject(req);

    //we need to write own schema parser

    var userId = inputObject.userId;
    delete inputObject.userId;

    return new userModelMysql().getClient()

        .update(inputObject)
        .where({id: userId}).then(function(output) {
        res.send({response: output});
    });

});

srv.delete("/mysql/users/:userId", function(req, res) {

    var inputObject = commonHelper.getParamsObject(req);
    return new userModelMysql().getClient()
        .where({id: parseInt(inputObject.userId)})
        .del().then(function(output) {
        res.send({response: output});
    });

});


srv.listen(8081);
console.log('Server running on port 8081.');


