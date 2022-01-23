/* eslint-disable no-param-reassign */
const model = require('../models');

/**
 * @description check user login data and return login token if user is exist and verified
 * @param {Object} of {String} phone, {String} password, {String} agent
 * @returns {token} if user found or {error} if not
 * @memberof use-cases
 */

// should have no implementation for any specific orm
module.exports = ({ GetSortObj }) => async ({
  key,
  limit,
  user,
  sortIndex,
  sortKey,
  sortValue
}) => {
  const sortObj = GetSortObj({
    sortIndex,
    sortKey,
    sortValue
  });
  const query = {
    ...sortObj.query,
    isArchived: false
  };
  if (key && key !== '') {
    query.$or = [
      {
        username: { $regex: key, $options: 'i' }
      },
      {
        fullName: { $regex: key, $options: 'i' }
      }
    ];
  }

  if (
    user &&
    user.permissions &&
    !user.permissions.includes('admin') &&
    user.permissions.includes('branch_head')
  ) {
    query.branch = user.branch;
  }

  const select =
    'fullName username permissions rank branch isFull createdAt updatedAt';
  const sort = sortObj.sort;
  const { users, total, hasNext } = await model.getUsers({
    query,
    select,
    sort,
    limit
  });
  if (users && users.length !== 0) {
    return { total, hasNext, users };
  }
  return { total: 0, hasNext: false, users: [] };
};
