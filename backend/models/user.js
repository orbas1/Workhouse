const { randomUUID } = require('crypto');

const users = [];

function findUser(username) {
  return users.find(u => u.username === username);
}

function addUser({ username, password, role }) {
  const user = { id: randomUUID(), username, password, role };
  users.push(user);
  return user;
}

module.exports = { users, findUser, addUser };
