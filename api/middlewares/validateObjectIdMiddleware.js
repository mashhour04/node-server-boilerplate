const { ObjectId } = require('mongoose').Types;

module.exports = ids => (req, res, next) => {
  const errors = [];
  ids.forEach(id => {
    if (!ObjectId.isValid(req.params[id]))
      errors.push(`${id} is invalid ObjectId`);
  });
  if (errors.length) return res.status(400).json({ error: errors });
  return next();
};
