// const { Builder: __Builder } = require('validation-helpers');
// const { defaultConstants } = require('../../../shared/constants');

// const _genderEnum = Object.values(defaultConstants.GENDER_TYPES);
// const _jobTypeEnum = Object.values(defaultConstants.JOB_TYPES);

module.exports = ({ _, ValidatorHelper, Builder }) => ({ body }) => {
  const error = {};

  const scheme = {
    fullName: {
      value: body.fullName,
      rules: new Builder().required('fullName is required').rules
    },
    username: {
      value: body.username,
      rules: new Builder().required('username is required').rules
    },
    password: {
      value: body.password,
      rules: new Builder()
        .required()
        .minLength(5)
        .maxLength(60).rules
    },

    permissions: {
      value: body.permissions,
      rules: new Builder().required('permission is required').rules
    }
    // TODO: Edit error messages
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  return {
    error: _.isEmpty(error) ? undefined : error
  };
};
