const { register, login, verifyToken } = require('../services/auth');
const { createProfile } = require('../services/profile');
const verifyRecaptcha = require('../utils/verifyRecaptcha');

async function registerHandler(req, res) {
  const { email, password, fullName, phone, location, bio, expertise, recaptchaToken } = req.body;
  try {
    const validCaptcha = await verifyRecaptcha(recaptchaToken);
    if (!validCaptcha) {
      return res.status(400).json({ error: 'Invalid CAPTCHA' });
    }
    const user = await register(email, password, 'user', { fullName, phone, location });
    await createProfile(user.id, { bio, preferences: { expertise } });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginHandler(req, res) {
  const { username, password } = req.body;
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
  res.json({ id: payload.id, username: payload.username, role: payload.role });
}

module.exports = { registerHandler, loginHandler, meHandler };
