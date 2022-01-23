const Model = require('../models');

module.exports = () => async username => {
  const result = {};
  const users = await Model.getUsersWithusernameSearch(username);
  users.forEach(u => {
    result[u._id.toString()] = {
      renterId: u._id,
      username: u.username,
      fullName: u.fullName,
      address: u.address,
      government: u.government,
      image: u.image,
      birthDateTs: u.birthDateTs,
      gender: u.gender,
      job: u.job
    };
  });

  return result;
};
