const express = require('express');
const auth = require('../middleware/auth');
const {
  createConnectionHandler,
  listConnectionsHandler,
  getConnectionHandler,
  updateConnectionHandler,
  deleteConnectionHandler,
} = require('../controllers/connection');
const connectionController = require('../controllers/connectionController');

const router = express.Router();

// Legacy user-specific endpoints
router.get('/user/:userId', auth, connectionController.getConnections);
router.post('/user/:userId', auth, connectionController.addConnection);
router.put('/user/:id', auth, connectionController.updateConnection);

// Standard CRUD endpoints
router.post('/', auth, createConnectionHandler);
router.get('/', auth, listConnectionsHandler);
router.get('/:connectionId', auth, getConnectionHandler);
router.put('/:connectionId', auth, updateConnectionHandler);
router.delete('/:connectionId', auth, deleteConnectionHandler);

module.exports = router;
