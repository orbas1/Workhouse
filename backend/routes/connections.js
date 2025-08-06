const express = require('express');
const auth = require('../middleware/auth');
const {
  createConnectionHandler,
  listConnectionsHandler,
  getConnectionHandler,
  updateConnectionHandler,
  deleteConnectionHandler,
} = require('../controllers/connection');

const router = express.Router();

router.post('/', auth, createConnectionHandler);
router.get('/', auth, listConnectionsHandler);
router.get('/:connectionId', auth, getConnectionHandler);
router.put('/:connectionId', auth, updateConnectionHandler);
router.delete('/:connectionId', auth, deleteConnectionHandler);

module.exports = router;
