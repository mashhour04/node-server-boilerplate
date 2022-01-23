module.exports = () => (req, res, next) => {
  req.view = true;
  req.seen = req.query.seen;
  return next();
};
