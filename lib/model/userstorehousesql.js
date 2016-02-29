/**
 * Created by faiz on 4/20/15.
 */
var sqlClient = require("./storehousesql.js")();
var commonHelper = require("../helpers/common");

var user = function() {

    // function minLength(v) {
    //     return v.length > 5;
    // };

    // Mongoose Schema definition
    // var Schema = mongoClient.Schema;
    // var UserSchema = new Schema({
    //     first_name: {
    //         type: String,
    //         required: true
    //     },
    //     last_name: {
    //         type: String,
    //         required: true,
    //         validate: [minLength, "should be > 5"]
    //     },
    //     email: {
    //         type: String,
    //         required: true
    //     }
    // });

    // Mongoose Model definition
    // var User = mongoClient.model('users', UserSchema);

    // User.schema.path('email').validate(commonHelper.isValidEmail, 'Invalid email address.');

    var Post = sqlClient.extend({
            tableName: "posting"
        });

    return Post;

};


module.exports = user;



