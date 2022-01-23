/* eslint-disable no-unused-vars */
//! only require Entity/model
const { UserEntity } = require('../Entity');

// ! use Entity as much as possible use model for only urgent cases
const Models = require('../models');

// should have no implementation for any specific orm
module.exports = ({ ApplicationError, logger }) => async ({
  fullName,
  username,
  password,
  rank,
  branch,
  permissions
}) => {
  const isDuplicate = await Models.checkExistenceBy({ username });

  if (isDuplicate)
    throw new ApplicationError('Duplicate email or username', 400);

  const newUser = new UserEntity({
    fullName,
    username,
    rank,
    branch,
    permissions: typeof permissions === 'string' ? [permissions] : permissions
  });

  newUser.setPassword(password);

  await newUser.save();
  const token = newUser.generateToken();

  logger.info(
    `new User just registered with data => \n${JSON.stringify(
      newUser.toJson(),
      undefined,
      6
    )}`
  );
  return token;
};
