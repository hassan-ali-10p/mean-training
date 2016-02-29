/**
 * Created by faiz on 4/20/15.
 */
/**
 * Created by faiz on 4/20/15.
 */
var Promise = require('bluebird');
var Configuration = require("../configuration/index")();
var Knex = require('knex');

function getMySqlClient() {

    var _knex = Knex.initialize({
        client: "mysql",
        connection: {
            host: Configuration.sqldb.host,
            user: Configuration.sqldb.uid,
            password: Configuration.sqldb.pwd,
            database: Configuration.sqldb.db,
            charset: (Configuration.sqldb.charset) ? Configuration.sqldb.charset : "UTF8_GENERAL_CI"
        }
    });

    function extend(tableName) {

        function Model(obj) {
            this.tableName = tableName;
            this.input = obj;
        }
        return Model;

    }
    return {
        extend: extend,
        client: _knex
    };

};

module.exports.getMySqlClient = getMySqlClient;


