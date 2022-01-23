const makeUserRegisterCtrl = require('./user-register');
const makeUserLoginUserCtrl = require('./user-login');
const makeUserLoginAdminCtrl = require('./admin-login');
const makeUserLogOutCtrl = require('./user-logout');
const makeChangePassword = require('./change-password');
const makeGetUserProfile = require('./get-profile');
const makeUpdateUserProfile = require('./update-profile');
const makeGetUsers = require('./get-users');

const {
  GetBaseDomain,
  defaultConstants
} = require('../../../shared/constants');

const pagination = Object.freeze(defaultConstants.PAGINATION);

// ->
const registerUser = makeUserRegisterCtrl({});
const loginUser = makeUserLoginUserCtrl({ GetBaseDomain });
const loginAdmin = makeUserLoginAdminCtrl({ GetBaseDomain });
const logOutUser = makeUserLogOutCtrl({ GetBaseDomain });
const changePassword = makeChangePassword({});
const getUserProfile = makeGetUserProfile({});
const updateUserProfile = makeUpdateUserProfile({});
const getUsers = makeGetUsers({ pagination });

const userCtrl = Object.freeze({
  registerUser,
  loginUser,
  loginAdmin,
  logOutUser,
  changePassword,
  getUserProfile,
  updateUserProfile,
  getUsers
});

module.exports = userCtrl;
