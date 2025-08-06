const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

function requireFields(...fields) {
  return (req, res, next) => {
    for (const field of fields) {
      if (req.body[field] === undefined) {
        return res.status(400).json({ error: `Missing field: ${field}` });
      }
    }
    next();
  };
}

function validateSchema(schema, property = 'body') {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}

function schemaValidator(schema, property = 'body') {
  return validateSchema(schema, property);
}

module.exports = schemaValidator;
module.exports.validate = validate;
module.exports.requireFields = requireFields;
module.exports.validateSchema = validateSchema;
