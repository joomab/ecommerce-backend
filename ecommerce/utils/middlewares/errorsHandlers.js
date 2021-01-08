//Manejo de errores.
const boom = require("@hapi/boom");
const { config } = require("../../config");
const isRequestAjaxOrApi = require("../../utils/isRequestAjaxOrApi");

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack }; //Object.assign({}, err, stack)
  }
}

function logErrors(err, req, res, next) {
  console.log("Error", err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function clientErrorHandler(err, req, res, next) {
  // catch errors for AJAX request
  //Si la llamada fue por http request (o un cliente) solo devolvemos json

  const {
    output: { statusCode, payload },
  } = err;

  // catch errors for AJAX request or if an error ocurrs while straming
  if (irRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  //catch errors while streaming
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode || 500);
  res.render("error", withErrorStack(payload, err.stack));
}

module.exports = { logErrors, clientErrorHandler, errorHandler, wrapErrors };
