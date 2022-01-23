//! only require Entity/model
const { UserEntity } = require('../Entity');

// should have no implementation for any specific orm
module.exports = ({ ApplicationError, logger }) => async ({
  password,
  requestUser
}) => {
  const user = await UserEntity.loadEntityFromDbByUsername(
    requestUser.username
  );
  if (user) {
    user.setPassword(password);
    await user.save();

    logger.info(
      `"${requestUser.username}" just changed his password successfully`
    );
  } else
    throw new ApplicationError(
      'Sorry , we were unable to find this account',
      403
    );
};
