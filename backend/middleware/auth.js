const { verifyToken } = require('../services/auth');

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  const token = header.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.user = payload;
  next();
}

module.exports = authenticate;
