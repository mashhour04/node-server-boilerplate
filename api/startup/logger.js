// TODO: review formats
const winston = require('winston');

// prepare winston to log
const logger = winston.createLogger({
  // in general log level will be info
  level: 'info',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp()
  ),
  // maximum size of logs file is 5 M
  maxsize: 5242880,

  // max number files is 5 files for logs
  maxFiles: 5,
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // any log with error level will be in error log file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      prettyPrint: true,
      humanReadableUnhandledException: true,
      handleExceptions: false,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp()
      )
    }),

    // any log with level info will be logged in combined file
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'info',
      prettyPrint: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp()
      ),
      handleExceptions: false,
      humanReadableUnhandledException: true
    }),

    // here to configure console logs only
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp()
      ),
      handleExceptions: false,
      prettyPrint: true,
      humanReadableUnhandledException: true
    })
  ],

  // here to configure exception logs only
  exceptionHandlers: [
    new winston.transports.File({
      tailable: true,
      filename: 'logs/exceptions.log',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp()
      ),
      handleExceptions: true,
      exitOnError: false,
      prettyPrint: true,
      humanReadableUnhandledException: true
    })
  ]
});

module.exports = logger;
