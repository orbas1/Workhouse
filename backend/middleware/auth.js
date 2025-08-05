const { verifyToken } = require('../services/auth');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    console.warn('Unauthorized access attempt');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = payload;
  next();
}

module.exports = authMiddleware;
