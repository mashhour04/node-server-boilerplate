const { registerUser } = require('../use-cases');

module.exports = () => {
  return async (req, res, next) => {
    try {
      const userRegister = await registerUser({ ...req.body });

      return res
        .status(200)
        .json({ message: 'User created successfully!', token: userRegister });
    } catch (e) {
      return next(e);
    }
  };
};
