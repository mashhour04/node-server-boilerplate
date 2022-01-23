const Model = require('../models');

// eslint-disable-next-line no-unused-vars
module.exports = ({ ApplicationError }) => async (permissions, select = []) => {
  if (!Array.isArray(permissions))
    throw new ApplicationError(
      'You should pass permissions as array to getUsersByIds (User external service)'
    );

  const result = {};

  const users = await Model.getUsersWithPermissions(permissions, select);
  users.forEach(u => {
    const id = u._id.toString();
    result[id] = {
      userId: u._id
    };
    select.map(key => {
      result[id][key] = u[key];
      return true;
    });
  });

  return result;
};
