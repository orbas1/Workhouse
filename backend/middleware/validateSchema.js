const logger = require('../utils/logger');

module.exports = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    logger.error('Validation failed', { error: error.details[0].message });
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
