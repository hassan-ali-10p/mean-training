/**
 * Created by faiz on 4/20/15.
 */
var Promise = require('bluebird');

var Configuration = require("../configuration/index")();

var mongoose = require('mongoose');

function getMongooseClient() {

    mongoose.connect('mongodb://'+Configuration.mongodb.host + ":" + Configuration.mongodb.port+ "/" + Configuration.mongodb.db, function (error) {
        if (error) {
            throw error;
        }
    });
    return mongoose;

};

module.exports = getMongooseClient;


