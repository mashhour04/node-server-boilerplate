const ApplicationError = require('./ApplicationError');

class ForbiddenError extends ApplicationError {
  constructor(message, status = 403, hideNotification) {
    super(message || 'Forbidden', status, hideNotification);
  }
}
module.exports = ForbiddenError;
