/**
 * Created by faiz on 4/20/15.
 */
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

function isValidEmail(value) {
    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value);
}

function preparePagingObject(context){

    var inputObject = getParamsObject(context);
    var pagingObject = {
        skip: 0,
        limit: 10 //default
    };
    if(inputObject) {
        if(parseInt(inputObject.skip) > -1) {
            pagingObject.skip = inputObject.skip;
        }
        if(parseInt(inputObject.limit) > -1) {
            pagingObject.limit = inputObject.limit;
            if(pagingObject.limit > 100) {
                pagingObject.limit = 100; //max
            }
        }
    }

    return pagingObject;

}

module.exports.getParamsObject = getParamsObject;
module.exports.isValidEmail = isValidEmail;
module.exports.preparePagingObject = preparePagingObject;