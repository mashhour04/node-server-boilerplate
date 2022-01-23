const logger = require('../startup/logger');
const { isAuthorized } = require('../shared/constants/methods');

module.exports = ({ permissions }) => (req, res, next) => {
  const { originalUrl, user } = req;
  const auth = isAuthorized({ user, permissions });
  if (auth) {
    return next();
  }

  logger.error(`access denied! ${originalUrl}`);
  return res
    .status(403)
    .json({ message: "You're not authorized to do this action" });
};
