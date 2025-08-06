const { users } = require('../models/user');

function getUserCount() {
  return users.length;
}

function listUsers() {
  return users;
}

function updateUserRole(id, role) {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.role = role;
  return user;
}

function deleteUser(id) {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

module.exports = { getUserCount, listUsers, updateUserRole, deleteUser };
