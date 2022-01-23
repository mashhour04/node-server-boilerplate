const mongoose = require('mongoose');
const _ = require('lodash');
const { ValidatorHelper, Builder } = require('validation-helpers');

const sortKeys = ['_id', 'updatedAt', 'createdAt'];
const sortValues = [-1, 1];
const { ObjectId } = mongoose.Types;
module.exports.ObjectIdValidation = ({ params, query }) => {
  const error = {};

  const scheme = {
    id: {
      value: params.id,
      rules: new Builder().rules
    },
    limit: {
      value: query.limit,
      rules: new Builder().rules
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
    if (key === 'id' && !ObjectId.isValid(ele.value))
      error[key] = ['id should be a valid ObjectId'];
  });

  return { error: _.isEmpty(error) ? undefined : error };
};

module.exports.PaginationValidtion = ({ query }) => {
  const error = {};

  if (query.limit) {
    // eslint-disable-next-line no-param-reassign
    query.limit = parseInt(query.limit, 10);
  }

  const scheme = {
    limit: {
      value: query.limit,
      rules: new Builder()
        .isNumber()
        .min(1)
        .max(5).rules
    },
    sortKey: {
      value: query.sortKey,
      rules: new Builder().isMember(sortKeys).rules
    },
    sortIndex: {
      value: query.sortIndex,
      rules: new Builder().isNumber().isMember(sortValues).rules
    },
    sortValue: {
      value: query.sortValue,
      rules: new Builder().rules
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (key === 'limit' && query.limit && _.isNaN(Number(ele.value)))
      error[key] = ['you should provide a valid limit'];
    else if (
      key === 'limit' &&
      query.limit &&
      (Number(ele.value) < 1 || Number(ele.value) > 50)
    )
      if (!isValid) error[key] = errors;
  });

  return {
    error: _.isEmpty(error) ? undefined : error
  };
};
