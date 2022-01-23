const logger = require('./logger');

const handleException = (err, errType) => {
  logger.error(
    `Error Type: ${errType},\nError Name: ${err.name},\nError Message: ${err.message},\nError Stack: ${err.stack}`
  );
  // TODO:
  // process.exit();
};

const handleErrors = () => {
  process.on('uncaughtException', err =>
    handleException(err, 'uncaughtException')
  );
  process.on('unhandledRejection', err =>
    handleException(err, 'unhandledRejection')
  );
};

module.exports = handleErrors;
