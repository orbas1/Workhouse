const { getUserCount } = require('../services/users');

function getUserCountHandler(req, res) {
  const count = getUserCount();
  res.json({ count });
}

module.exports = { getUserCountHandler };
