const { randomUUID } = require('crypto');

const users = [];

function findUser(username) {
  return users.find(u => u.username === username);
}

function addUser({ username, password, role }) {
  const user = { id: randomUUID(), username, password, role };
  users.push(user);
  return user;
function addUser({ username, password, role = 'user' }) {
  users.push({ username, password, role });
}

function updatePassword(username, password) {
  const user = findUser(username);
  if (!user) return false;
  user.password = password;
  return true;
}

module.exports = { users, findUser, addUser, updatePassword };
