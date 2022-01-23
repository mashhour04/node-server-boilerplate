const { getUserProfile } = require('../use-cases');

module.exports = () => {
  return async (req, res, next) => {
    try {
      const userData = await getUserProfile(req.user.id || '000000000000');

      return res.status(200).json({
        success: true,
        profileData: userData
      });
    } catch (e) {
      return next(e);
    }
  };
};
