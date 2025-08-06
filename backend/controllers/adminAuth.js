const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUser } = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

/**
 * Handle admin login. Only users with role 'admin' are allowed.
 * Expects validatedBody with username and password provided by validation middleware.
 */
async function adminLoginHandler(req, res) {
  const { username, password } = req.validatedBody;
  try {
    const user = findUser(username);
    if (!user || user.role !== 'admin') {
      throw new Error('Invalid credentials');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { adminLoginHandler };
