const { users } = require('../models/user');

function getUserCount() {
  return users.size;
}

function listUsers() {
  return Array.from(users.values());
}

function updateUserRole(id, role) {
  for (const user of users.values()) {
    if (user.id === id) {
      user.role = role;
      return user;
    }
  }
  return null;
}

function deleteUser(id) {
  for (const [username, user] of users.entries()) {
    if (user.id === id) {
      users.delete(username);
      return true;
    }
  }
  return false;
}

module.exports = { getUserCount, listUsers, updateUserRole, deleteUser };
