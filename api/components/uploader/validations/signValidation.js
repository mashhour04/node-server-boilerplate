const { Builder: ___, ValidatorHelper: __ } = require('validation-helpers');

module.exports = ({ _, Builder = ___, ValidatorHelper = __ }) => ({
  query
}) => {
  const error = {};

  const scheme = {
    fileName: {
      value: query['file-name'],
      rules: new Builder().required().rules
    },
    fileExtension: {
      value: query['default-ext'],
      rules: new Builder().required().rules
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) {
      error[key] = errors;
    }
  });

  return { error: _.isEmpty(error) ? undefined : error };
};
