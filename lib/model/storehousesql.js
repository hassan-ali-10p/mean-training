/**
 * Created by faiz on 4/20/15.
 */
var Promise = require('bluebird');

var Configuration = require("../configuration/index")();

var storehouse = require('storehouse');

function getStoreHouseClient() {

    sqlBaseModel = storehouse.initialize(Configuration.storehssql);
    return sqlBaseModel;

};

module.exports = getStoreHouseClient;


