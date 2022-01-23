const { Builder, ValidatorHelper } = require('validation-helpers');
const _ = require('lodash');

const makeUserRegisterValidation = require('./user-register-validation');
const makeUserLoginValidation = require('./user-login-validation');

const makeForgetPasswordValidation = require('./forget-password-validation');
const makeConfirmForgetPasswordValidation = require('./confirm-forget-password-validation');
const makeConfirmUpdatePasswordValidation = require('./confirm-update-password-validation');
const makeChangePasswordValidation = require('./change-password');
const makeUpdateUserPasswordValidation = require('./update-user-password');

module.exports.userRegisterValidation = makeUserRegisterValidation({
  _,
  Builder,
  ValidatorHelper
});

module.exports.userLoginValidation = makeUserLoginValidation({
  _,
  Builder,
  ValidatorHelper
});

module.exports.forgetPasswordValidation = makeForgetPasswordValidation({
  _,
  Builder,
  ValidatorHelper
});

module.exports.confirmForgetPasswordValidation = makeConfirmForgetPasswordValidation(
  {
    _,
    Builder,
    ValidatorHelper
  }
);

module.exports.changePasswordValidation = makeChangePasswordValidation({
  _,
  Builder,
  ValidatorHelper
});

module.exports.updateUserPasswordValidation = makeUpdateUserPasswordValidation({
  _,
  Builder,
  ValidatorHelper
});

module.exports.confirmUpdatePasswordValidation = makeConfirmUpdatePasswordValidation(
  {
    _,
    Builder,
    ValidatorHelper
  }
);
