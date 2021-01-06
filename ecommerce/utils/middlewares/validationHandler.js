const Joi = require("@hapi/joi");

function validate(data, schema) {
  //const { error } = schema.validate(data);
  const { error } = Joi.object(schema).validate(data);
  return error;
}

function validationHandler(schema, check = "body") {
  return function (req, res, next) {
    //Retorna un middleware
    const error = validate(req[check], schema);
    error ? next(new Error(error)) : next();
  };
}

module.exports = validationHandler;