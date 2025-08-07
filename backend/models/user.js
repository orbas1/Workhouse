const { randomUUID } = require('crypto');
const { query } = require('../utils/db');

// Fallback in-memory store for environments without a database
const memoryUsers = new Map();

// Role constants used throughout the application
const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  SUPPORT: 'support',
  PROFESSIONAL: 'professional',
  USER: 'user',
};

/**
 * Fetch a user record by username.
 * @param {string} username
 * @returns {Promise<object|undefined>}
 */
async function findUser(username) {
  try {
    const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows[0]) return rows[0];
  } catch {
    // ignore and fall back to memory store
  }
  return memoryUsers.get(username);
}

/**
 * Insert a new user into the database.
 * @param {object} param0
 * @returns {Promise<object>} Created user
 */
async function addUser({ username, password, role = ROLES.USER, fullName = '', email = '', phone = '', location = '', bio = '', expertise = '' }) {
  const id = randomUUID();
  try {
    await query(
      'INSERT INTO users (id, username, password_hash, role, full_name, email, phone, location, bio, expertise) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, username, password, role, fullName, email, phone, location, bio, expertise]
    );
  } catch {
    // ignore DB errors, operate purely in memory
  }
  memoryUsers.set(username, {
    id,
    username,
    password_hash: password,
    role,
    full_name: fullName,
    email,
    phone,
    location,
    bio,
    expertise,
  });
  return { id, username, role, fullName, email, phone, location, bio, expertise };
}

/**
 * Update an existing user's password.
 * @param {string} username
 * @param {string} password Hashed password
 * @returns {Promise<boolean>}
 */
async function updatePassword(username, password) {
  try {
    await query('UPDATE users SET password_hash = ? WHERE username = ?', [password, username]);
  } catch {
    const user = memoryUsers.get(username);
    if (user) user.password_hash = password;
  }
  return true;
}

async function countUsers() {
  try {
    const rows = await query('SELECT COUNT(*) AS count FROM users');
    return Number(rows[0]?.count || 0);
  } catch {
    return memoryUsers.size;
  }
}

async function clearUsers() {
  try {
    await query('DELETE FROM users');
  } catch {
    memoryUsers.clear();
  }
}

module.exports = { ROLES, findUser, addUser, updatePassword, countUsers, clearUsers };
