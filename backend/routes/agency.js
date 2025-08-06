const express = require('express');
const {
  registerHandler,
  updateHandler,
  getHandler,
  deleteHandler,
} = require('../controllers/agency');
const auth = require('../middleware/auth');
const {
  validateAgencyRegistration,
  validateAgencyUpdate,
} = require('../middleware/validation');

const router = express.Router();

// POST /agency/register
router.post('/register', auth, validateAgencyRegistration, registerHandler);

// PUT /agency/update/:agencyId
router.put('/update/:agencyId', auth, validateAgencyUpdate, updateHandler);

// GET /agency/:agencyId
router.get('/:agencyId', auth, getHandler);

// DELETE /agency/:agencyId
router.delete('/:agencyId', auth, deleteHandler);

module.exports = router;
