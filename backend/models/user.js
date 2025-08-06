const { randomUUID } = require('crypto');

// In-memory user store backed by a Map for O(1) lookups. In a real
// application this would be persisted to a database table. Each user
// has a UUID identifier, username, hashed password, role and basic
// profile information.
const users = new Map();

// Define the supported roles within the system. Providers can register
// as individual professionals offering services or as businesses that
// manage multiple providers.
const ROLES = {
  USER: 'user',
  PROFESSIONAL: 'professional',
  BUSINESS: 'business',
  ADMIN: 'admin',
};

/**
 * Find a user by username.
 * @param {string} username
 * @returns {object|undefined}
 */
function findUser(username) {
  return users.get(username);
}

/**
 * Add a new user to the store.
 * @param {{
 *   username: string,
 *   password: string,
 *   role?: string,
 *   fullName?: string,
 *   email?: string,
 *   phone?: string,
 *   location?: string,
 *   bio?: string,
 *   expertise?: string
 * }} param0
 * @returns {object} The created user record
 */
function addUser({ username, password, role = ROLES.USER, fullName = '', email = '', phone = '', location = '', bio = '', expertise = '' }) {
  const normalizedRole = Object.values(ROLES).includes(role) ? role : ROLES.USER;
  const user = {
    id: randomUUID(),
    username,
    email: email || username,
    password,
    role: normalizedRole,
    fullName,
    phone,
    location,
    bio,
    expertise,
  };
  users.set(username, user);
  return user;
}

/**
 * Update an existing user's password.
 * @param {string} username
 * @param {string} password
 * @returns {boolean} True if the user was found and updated
 */
function updatePassword(username, password) {
  const user = users.get(username);
  if (!user) return false;
  user.password = password;
  return true;
}

module.exports = { users, ROLES, findUser, addUser, updatePassword };
