const users = [];

function findUser(username) {
  return users.find(u => u.username === username);
}

function addUser(user) {
  users.push(user);
}

function updatePassword(username, password) {
  const user = findUser(username);
  if (!user) return false;
  user.password = password;
  return true;
}

module.exports = { users, findUser, addUser, updatePassword };
