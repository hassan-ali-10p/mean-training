/**
 * Created by faiz on 4/20/15.
 */
var Promise = require('bluebird');

function Config() {
    return {
        mongodb: {
            client: "mongo",
            host: "localhost",
            port: "27017",
            db: "testdb"
        },
        sqldb: {
            client: "mysql",
            host: "localhost",
            port: "3306",
            db: "testdb",
            uid: "root",
            pwd: "tenpearls"
        },
        storehsmongo: {
            client: "mongo",
            host: "localhost",
            port: "27017",
            db: "storehs"
        },
        storehssql: {
            client: "mysql",
            host: "localhost",
            port: "3306",
            db: "mystorehssql",
            uid: "root",
            pwd: "tenpearls"
        }
    };
}

module.exports = Config;
