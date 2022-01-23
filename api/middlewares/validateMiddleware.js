module.exports = validator => {
  return (req, res, next) => {
    const error = validator(req).error;
    if (error) return res.status(400).json({ error });
    return next();
  };
};
