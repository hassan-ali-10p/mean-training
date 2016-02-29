/**
 * Created by faiz on 4/20/15.
 */

var model = require("./mysql").getMySqlClient().extend({
    tableName: "users"
});
model.prototype.getClient = function getClient(WithoutCurrentTable){

    if(WithoutCurrentTable) {
        return require("./mysql").getMySqlClient().client;
    }
    else {
        return require("./mysql").getMySqlClient().client("users");
    }

};


module.exports = model;



