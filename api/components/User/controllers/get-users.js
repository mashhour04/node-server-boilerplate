const { getUsers } = require('../use-cases');

module.exports = ({ pagination }) => {
  return async (req, res, next) => {
    try {
      const limit = Number(req.query.limit) || Number(pagination.LIMIT);
      const lastId = req.query.lastId || String(pagination.LAST_ID);
      const key = req.query.key || '';
      const result = await getUsers({
        ...req.query,
        user: req.user,
        key,
        limit,
        lastId
      });

      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (e) {
      return next(e);
    }
  };
};
