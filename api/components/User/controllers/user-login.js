const { loginUser } = require('../use-cases');

// @route   POST api/users/login
// @desc    user login

// eslint-disable-next-line no-empty-pattern
module.exports = ({ GetBaseDomain }) => {
  return async (req, res, next) => {
    try {
      const agent = req.headers['user-agent'] || req.body.agent;
      const domain = GetBaseDomain();
      const maxAge = 365 * 24 * 60 * 60 * 1000;
      const result = await loginUser({ ...req.body, agent });
      res.cookie('reconToken', result.token, {
        domain,
        maxAge
      });

      res.cookie('reconAppToken', result.token, {
        domain,
        maxAge
      });

      return res
        .status(200)
        .json({ message: 'User logged in successfully!', ...result });
    } catch (e) {
      return next(e);
    }
  };
};
