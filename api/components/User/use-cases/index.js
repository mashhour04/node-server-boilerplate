/**
 * ! You should require any other external-use-cases or any dependency needed in any use-case here in index and inject it to the method wrapper
 *
 * ! if you need to throw Error use throw new ApplicationError() and will handle the rest in express catcher
 */
const moment = require('moment');
const passport = require('passport');

const logger = require('../../../startup/logger');
const { ApplicationError } = require('../../../shared/errors');

const { PERMISSIONS } = require('../../../shared/constants/defaults');
const { GetSortObj } = require('../../../shared/constants/methods');
// const emailService = require('../../../shared/services').emailService;

const makeRegisterUserUC = require('./register-user');
const makeLoginUser = require('./login-user');
const makeLoginAdmin = require('./login-admin');
const makeChangePassword = require('./change-password');
const makeGetUserProfile = require('./get-profile');
const makeUpdateUserProfile = require('./update-profile');
const makeGetUsers = require('./get-users');

const registerUser = makeRegisterUserUC({
  ApplicationError,
  logger
});

const changePassword = makeChangePassword({
  ApplicationError,
  logger
});

const getUserProfile = makeGetUserProfile({
  ApplicationError,
  logger
});

const updateUserProfile = makeUpdateUserProfile({
  ApplicationError,
  logger
});

const loginUser = makeLoginUser({
  ApplicationError,
  logger
});

const loginAdmin = makeLoginAdmin({
  ApplicationError,
  logger
});

const getUsers = makeGetUsers({
  ApplicationError,
  GetSortObj,
  logger
});
const userUseCases = {
  registerUser,
  loginUser,
  loginAdmin,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUsers
};

module.exports = userUseCases;
