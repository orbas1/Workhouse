const { getUserCount, listUsers, updateUserRole, deleteUser } = require('../services/users');

function getUserCountHandler(req, res) {
  const count = getUserCount();
  res.json({ count });
}

function listUsersHandler(req, res) {
  res.json(listUsers());
}

function updateUserRoleHandler(req, res) {
  const { id } = req.params;
  const { role } = req.body;
  const user = updateUserRole(id, role);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

function deleteUserHandler(req, res) {
  const { id } = req.params;
  const success = deleteUser(id);
  if (!success) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true });
}

module.exports = {
  getUserCountHandler,
  listUsersHandler,
  updateUserRoleHandler,
  deleteUserHandler,
};
