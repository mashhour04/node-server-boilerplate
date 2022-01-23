const logger = require('../../startup/logger');

class ApplicationError extends Error {
  constructor(message, status, hideNotification) {
    super();

    logger.error(`ApplicationError with message ${message}`);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || 'Something went wrong. Please try again.';

    this.status = status || 500;

    this.hideNotification = hideNotification; // used on the frontend to decide whether to show error notification to the user or not
  }
}

module.exports = ApplicationError;
