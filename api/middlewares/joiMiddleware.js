const Joi = require('joi');

// API body validation middleware
const validate = (validationSchema, reqPart = 'body') => {
  return (req, res, next) => {
    const validation = Joi.validate(req[reqPart], validationSchema, {
      abortEarly: false
    });

    if (validation.error) {
      const errors = [];
      validation.error.details.forEach(elem => {
        errors.push({
          path: elem.path[0],
          message: elem.message
        });
      });

      res.status(400).json({ errors });
    } else {
      next();
    }
  };
};

module.exports = validate;
