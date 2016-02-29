//  This file contains application wide messages

var fs = require("fs");



var _data_original = {

        REQUIRED : "%s required",
        INVALID_FORMAT : "%s invalid format",
        INTERNAL_ERROR : "Oh something bad happend on server, Please contact to system administrator",
        AUTH_FAILED: "authentication failed",
        AUTHORIZATION_FAILED: "authorization failed",
        ALREADY_EXIST: "%s already exist",
        NOT_FOUND: "%s not found",
        SUCCESS: "success",
        OUT_OF_RANGE: "%s value is out of range, must be between [%s, %s]",
        INVALID_LON: "invalid longitude",
        INVALID_LAT: "invalid latitude",
        INVALID_ARGS: "invalid arguments"
    },
    _file_loaded = false,
    _file_name = "resource.res",
    _resource_file_directory_path,
    _data = {};

function copy(copyfrom, copyto){

    for(var k in copyfrom){
        copyto[k]=copyfrom[k];
    }
}

function loadResourceFile(context, resource_file_directory_path, culture){
    _resource_file_directory_path = resource_file_directory_path;
    if(_file_loaded) {
        return;
    }
    _file_loaded = true;
    copy(_data_original, _data);

    if(!resource_file_directory_path){
        return;
    }

    try{
        if(culture && culture !== "en"){
            _file_name = "resource." + culture + ".res";
        }
        var data = fs.readFileSync(resource_file_directory_path + _file_name, {encoding : "utf8"});

        try{
            data = JSON.parse(data);
        }
        catch(error){
            throw new Error("Resource file is not valid JSON");
        }

        copy(data, _data);
        context.length =  Object.keys(_data).length;

    }
    catch(err){
        _file_loaded = false;
        throw err;
    }

}

function Messages (resource_file_path, culture){


    loadResourceFile(this, resource_file_path, culture);


    this.getMessage = function getMessage(code){
        return _data[code];
    };

    this.length = Object.keys(_data).length;

    this.reload = function reload(){
        _file_loaded = false;
        loadResourceFile(this, _resource_file_directory_path, culture);
    };

}

//module.exports = _data;
module.exports = Messages;