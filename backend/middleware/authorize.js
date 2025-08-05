const logger = require('../utils/logger');

module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      logger.error('Access denied', { userId: req.user?.id, role: userRole });
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      logger.error('Forbidden access attempt', {
        user: req.user?.username,
        role,
        allowedRoles,
      });
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      logger.error('Forbidden access attempt', { user: req.user?.username, role: req.user?.role });
// Middleware to check if authenticated user has required role(s)
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      logger.error('Access denied', { requiredRoles: allowedRoles, userRole: role });
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

