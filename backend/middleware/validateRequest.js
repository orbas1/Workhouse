const logger = require('../utils/logger');

module.exports = schema => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      logger.error('Validation error', { message: error.message });
      return res.status(400).json({ error: error.message });
    }
    req.validatedBody = value;
    next();
  };
};
