const Joi = require('joi');

module.exports = (req, res, next) => {
  const schema = Joi.string().uuid();
  const { error } = schema.validate(req.params.agencyId);
  if (error) {
    return res.status(400).json({ error: 'Invalid agencyId' });
  }
  next();
};
