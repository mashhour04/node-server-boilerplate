//! only require Entity/model
const model = require('../models');

// should have no implementation for any specific orm
module.exports = ({ ApplicationError, logger }) => async userId => {
  const query = {
    _id: userId,
    isArchived: false
  };
  const select = 'fullName username permissions rank branch';
  const user = await model.getOne({ query, select });
  if (user) {
    logger.info(`"${user.fullName}" just got his profile data.`);
    return user;
  }
  throw new ApplicationError('Sorry , we were unable to find this constant', 403);
};
