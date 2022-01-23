/**
 * ! You should require any other external-use-cases or any dependency needed in any use-case
 *
 *
 *
 * ! if you need to throw Error use throw new ApplicationError() and will handle the rest in express catcher
 */
const logger = require('../../../startup/logger');
const { ApplicationError } = require('../../../shared/errors');

const makeUpdateIdentification = require('./update-identification');
const makeGetUsersByIds = require('./get-users-data-with-ids');
// const makeGetUsersByusername = require('./get-users-data-with-username');
const makeGetUsersByPermissions = require('./get-users-with-permissions');

const updateIdentification = makeUpdateIdentification({
  ApplicationError,
  logger
});

const getUsersByIds = makeGetUsersByIds({
  logger,
  ApplicationError
});

const getUsersByPermissions = makeGetUsersByPermissions({
  logger,
  ApplicationError
});
const UsersExternalService = Object.freeze({
  getUsersByIds,
  getUsersByPermissions,
  updateIdentification
});

module.exports = UsersExternalService;
