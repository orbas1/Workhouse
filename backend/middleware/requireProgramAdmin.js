const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const roles = req.user?.roles || [];
  if (!Array.isArray(roles) || !roles.includes('program_admin')) {
    logger.error('Program admin privileges required', { user: req.user?.username });
    return res.status(403).json({ error: 'Program admin access required' });
  }
  next();
};
