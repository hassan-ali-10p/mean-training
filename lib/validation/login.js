var Joi = require('joi');

module.exports.login = {
  options : { flatten : true },
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
  },
  headers: {
    accesstoken: Joi.string().required(),
    userid : Joi.string().required()
  }
};

module.exports.login1 = {
  options : { flatten : true },
  query: {
    // title: Joi.string().email().required(),
    // password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    // description: Joi.string().required()
  }
};
