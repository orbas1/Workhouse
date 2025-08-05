const users = [];

function findUser(username) {
  return users.find(u => u.username === username);
}

function addUser({ username, password, role = 'user' }) {
  users.push({ username, password, role });
}

module.exports = { users, findUser, addUser };
