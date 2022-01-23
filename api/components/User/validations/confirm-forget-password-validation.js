module.exports = ({ _, Builder, ValidatorHelper }) => ({ body }) => {
  const error = {};

  const scheme = {
    username: {
      value: body.username,
      rules: new Builder()
        .required('username is required')
        .isMobile('invalid phone number').rules
    },
    code: {
      value: body.code,
      rules: new Builder()
        .required()
        .min(1000)
        .max(9999).rules
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) {
      error[key] = errors;
    }
    if (key === 'username' && ele.value && !String(ele.value).startsWith('01'))
      error[key] = ['invalid phone number'];
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
