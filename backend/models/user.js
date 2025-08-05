const { randomUUID } = require('crypto');

// In-memory user store. In a real application this would be persisted
// to a database table. Each user has a UUID identifier, username,
// hashed password, role and basic profile information.
const users = [];

/**
 * Find a user by username.
 * @param {string} username
 * @returns {object|undefined}
 */
function findUser(username) {
  return users.find(u => u.username === username);
}

/**
 * Add a new user to the store.
 * @param {{
 *   username: string,
 *   password: string,
 *   role?: string,
 *   fullName?: string,
 *   phone?: string,
 *   location?: string
 * }} param0
 * @returns {object} The created user record
 */
function addUser({ username, password, role = 'user', fullName = '', phone = '', location = '' }) {
  const user = {
    id: randomUUID(),
    username,
    email: username,
    password,
    role,
    fullName,
    phone,
    location,
  };
  users.push(user);
  return user;
}

/**
 * Update an existing user's password.
 * @param {string} username
 * @param {string} password
 * @returns {boolean} True if the user was found and updated
 */
function updatePassword(username, password) {
  const user = findUser(username);
  if (!user) return false;
  user.password = password;
  return true;
}

module.exports = { users, findUser, addUser, updatePassword };

