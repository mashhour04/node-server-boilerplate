const mongoose = require('mongoose');
const Promise = require('bluebird');
const logger = require('./logger');

mongoose.Promise = Promise;

module.exports = {
  connect: () => {
    const config = { useNewUrlParser: true, poolSize: 10 }
    const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
    const authenticated = DB_USERNAME && DB_PASSWORD
    const url = authenticated ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin` : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    mongoose.connect(url, config, err => {
      if (err) {
        throw err;
      }
      logger.info(`Connected to ${url}...`);
    });

    if (process.env.NODE_ENV === 'defaults') {
      mongoose.set('debug', true);
    }
  }
};
