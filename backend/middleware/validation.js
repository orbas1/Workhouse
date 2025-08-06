const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn('Validation failed', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

function validateAgencyRegistration(req, res, next) {
  const { name, services, contactEmail } = req.body;
  const errors = [];
  if (!name || typeof name !== 'string') {
    errors.push('Name is required and must be a string');
  }
  if (!contactEmail || typeof contactEmail !== 'string') {
    errors.push('contactEmail is required and must be a string');
  }
  if (services && !Array.isArray(services)) {
    errors.push('services must be an array of strings');
  }
  if (errors.length) {
    return res.status(400).json({ errors });
  }
  next();
}

function validateAgencyUpdate(req, res, next) {
  const { name, services, contactEmail } = req.body;
  if (!name && !services && !contactEmail) {
    return res
      .status(400)
      .json({ error: 'At least one field (name, services, contactEmail) must be provided' });
  }
  if (name && typeof name !== 'string') {
    return res.status(400).json({ error: 'name must be a string' });
  }
  if (contactEmail && typeof contactEmail !== 'string') {
    return res.status(400).json({ error: 'contactEmail must be a string' });
  }
  if (services && !Array.isArray(services)) {
    return res.status(400).json({ error: 'services must be an array of strings' });
  }
  next();
}

module.exports = {
  handleValidationErrors,
  validateAgencyRegistration,
  validateAgencyUpdate,
};
