const ForbiddenError = require('./ForbiddenError');
const UnauthorizedError = require('./UnauthorizedError');
const NotFoundError = require('./NotFoundError');
const ApplicationError = require('./ApplicationError');
const ErrorText = require('./ErrorTexts');

module.exports = {
  ApplicationError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ErrorText
};
