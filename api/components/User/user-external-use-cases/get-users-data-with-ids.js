const Model = require('../models');

// eslint-disable-next-line no-unused-vars
module.exports = ({ ApplicationError }) => async ids => {
  if (!Array.isArray(ids))
    throw new ApplicationError(
      'You should pass ids as array to getUsersByIds (User external service)'
    );

  const result = {};
  ids.forEach(id => {
    result[id.toString()] = null;
  });

  const users = await Model.getUsersWithIds(ids);
  users.forEach(u => {
    result[u._id.toString()] = {
      renterId: u._id,
      email: u.email,
      address: u.address,
      username: u.username,
      fullName: u.fullName,
      government: u.government,
      image: u.image,
      birthDateTs: u.birthDateTs,
      gender: u.gender,
      job: u.job
    };
  });

  return result;
};
