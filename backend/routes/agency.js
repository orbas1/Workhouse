const express = require('express');
const {
  registerHandler,
  updateHandler,
  getHandler,
  deleteHandler,
} = require('../controllers/agency');
const { authenticate } = require('../middleware/auth');
const {
  validateAgencyRegistration,
  validateAgencyUpdate,
} = require('../middleware/validation');

const router = express.Router();

// POST /agency/register
router.post('/register', authenticate, validateAgencyRegistration, registerHandler);

// PUT /agency/update/:agencyId
router.put('/update/:agencyId', authenticate, validateAgencyUpdate, updateHandler);

// GET /agency/:agencyId
router.get('/:agencyId', authenticate, getHandler);

// DELETE /agency/:agencyId
router.delete('/:agencyId', authenticate, deleteHandler);

module.exports = router;
