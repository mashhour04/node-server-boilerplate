/* eslint-disable no-unused-vars */
//! only require Entity/model
const { UserEntity } = require('../Entity');
const {
  PERMISSIONS_KEYS: PERMISSIONS
} = require('../../../shared/constants/defaults');

// should have no implementation for any specific orm
module.exports = ({ logger }) => async ({ username, password, fullName }) => {
  try {
    let user = await UserEntity.loadEntityFromDbByUsername(username);

    // # create scenario (if no admin user, then create new one)
    if (!user) {
      user = new UserEntity({
        permissions: [PERMISSIONS.ADMIN],
        fullName,
        username
      });

      user.setPassword(password);

      await user.save();
    } else {
      // # if admin user exist,
      // #        then check password and confirm its the same password as needed
      const checkPassword = user.comparePassword(password);

      // # change password scenario (if password is not the same change it)
      if (!checkPassword) {
        user.setPassword(password);
        await user.save();
      }
      // # if user exists with the same password then everyone is happy
    }

    logger.info(
      `ADMIN User created with username:password => ${username}:${password}`
    );
  } catch (error) {
    logger.info(`### ERROR ### while creating ADMIN USER => ${error.message}`);
  }
};
