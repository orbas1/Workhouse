const { users } = require('../models/user');

function getUserCount() {
  return users.length;
}

module.exports = { getUserCount };
