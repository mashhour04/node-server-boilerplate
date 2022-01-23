const _ = require('lodash');
const mongooseValidationError = require('mongoose').Error.ValidationError;

const createError = require('http-errors');
const logger = require('../startup/logger');

// catch 404 and forward to error handler
module.exports.catch404Errors = (req, res, next) => {
  next(createError(404));
};

// eslint-disable-next-line no-unused-vars
module.exports.handleUnexpectedErrors = (err, req, res, next) => {
  // TODO: should be logger.error
  logger.info(err);
  const error = err;
  if (error instanceof mongooseValidationError) {
    const validateError = [];
    Object.keys(error.errors).forEach(key => {
      validateError.push(error.errors[key].message);
    });
    error.message = validateError.join('. ');
    error.status = 400;
  }

  if (error instanceof SyntaxError) {
    error.message = 'Invalid JSON';
    error.status = 400;
  }

  if (!error.status && !error.statusCode) {
    error.status = 500;
  }
  const errorMessage =
    error.name !== 'StatusCodeError'
      ? error.message
      : error.error.error.message;
  const errorResponse = {
    success: false,
    message: error.status !== 500 ? errorMessage : 'Internal server error',
    hideNotification: error.hideNotification
  };

  if (_.includes([401, 400, 403, 404, 406, 422], error.status))
    logger.warn(errorMessage);
  else {
    // if development mode, console all error message
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stackTrace = error.stack;
    }
    logger.error(errorMessage);
  }

  // return the error
  res.status(error.status);
  res.json(errorResponse).end();

  next();
};
