const { register, login, verifyToken } = require('../services/auth');

async function registerHandler(req, res) {
  const { username, password, role, fullName, email, phone, location, bio, expertise } = req.validatedBody;
  try {
    const user = await register({ username, password, role, fullName, email, phone, location, bio, expertise });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginHandler(req, res) {
  const { username, password } = req.validatedBody;
  try {
    const result = await login(username, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

function meHandler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ id: payload.id, username: payload.username, role: payload.role, fullName: payload.fullName, email: payload.email });
}

module.exports = { registerHandler, loginHandler, meHandler };
