const users = [];

function findUser(username) {
  return users.find(u => u.username === username);
}

function addUser(user) {
  users.push(user);
}

module.exports = { users, findUser, addUser };
