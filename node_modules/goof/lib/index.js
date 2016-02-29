function goof(resource_file_path, culture){

    this.Errors = require("./errors");
    var Msg = require("./messages");
    this.Messages = new Msg(resource_file_path, culture);
    return this;
}

module.exports = goof;

