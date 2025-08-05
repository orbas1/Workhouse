// Simple middleware factory to ensure required fields are present in the request body.
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

module.exports = { requireFields };
module.exports = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
