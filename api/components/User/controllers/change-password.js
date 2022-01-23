const { changePassword } = require('../use-cases');

module.exports = () => {
  return async (req, res, next) => {
    try {
      await changePassword({ ...req.body, requestUser: req.user });

      return res.status(200).json({
        success: true
      });
    } catch (e) {
      return next(e);
    }
  };
};
