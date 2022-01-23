const logger = require('../../../startup/logger');

const makeCreateSystemAdmin = require('./create-system-admin');

const createSystemAdmin = makeCreateSystemAdmin({
  logger
});

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

module.exports = () => {
  createSystemAdmin({
    fullName: 'ADMIN',
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD
  });
};
