const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUser, addUser, updatePassword } = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

/**
 * Register a new user.
 * @param {string} username
 * @param {string} password Plain text password
 * @param {string} [role='user'] Role assigned to the user
 * @returns {Promise<{id: string, username: string, role: string}>}
 */
async function register(username, password, role = 'user') {
  const existing = findUser(username);
  if (existing) {
    throw new Error('User already exists');
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = addUser({ username, password: hashed, role });
  return { id: user.id, username: user.username, role: user.role };
}

/**
 * Authenticate a user and return a JWT token.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{token: string}>}
 */
async function login(username, password) {
  const user = findUser(username);
  if (!user) {
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
  return { token };
}

/**
 * Reset a user's password.
 * @param {string} username
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
async function resetPassword(username, newPassword) {
  const user = findUser(username);
  if (!user) {
    throw new Error('User not found');
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  updatePassword(username, hashed);
}

/**
 * Verify a JWT token.
 * @param {string} token
 * @returns {object|null} Decoded token or null if invalid
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { register, login, resetPassword, verifyToken };

