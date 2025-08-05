const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn('Validation failed', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { handleValidationErrors };
