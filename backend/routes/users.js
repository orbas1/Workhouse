const express = require('express');
const auth = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const {
  getUserCountHandler,
  listUsersHandler,
  updateUserRoleHandler,
  deleteUserHandler,
} = require('../controllers/users');

const router = express.Router();

router.get('/count', auth, getUserCountHandler);
router.get('/', auth, requireAdmin, listUsersHandler);
router.patch('/:id/role', auth, requireAdmin, updateUserRoleHandler);
router.delete('/:id', auth, requireAdmin, deleteUserHandler);

module.exports = router;
