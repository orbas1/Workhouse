// Middleware to ensure a user can only access their own assessment data unless admin
module.exports = function ensureAssessmentAccess(req, res, next) {
  const targetUserId = req.params.userId || req.body.userId;
  if (!targetUserId) {
    return res.status(400).json({ error: 'User identifier required' });
  }
  const user = req.user || {};
  const isAdmin = user.role === 'admin' || (Array.isArray(user.roles) && user.roles.includes('admin'));
  if (isAdmin || user.username === targetUserId) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden' });
};

