const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');

// List all connections for a user
router.get('/user/:userId', connectionController.getConnections);

// Create a new connection for a user
router.post('/user/:userId', connectionController.addConnection);

// Update an existing connection
router.put('/:id', connectionController.updateConnection);
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

router.post('/', auth, createConnectionHandler);
router.get('/', auth, listConnectionsHandler);
router.get('/:connectionId', auth, getConnectionHandler);
router.put('/:connectionId', auth, updateConnectionHandler);
router.delete('/:connectionId', auth, deleteConnectionHandler);

// User-scoped routes
router.get('/user/:userId', auth, connectionController.getConnections);
router.post('/user/:userId', auth, connectionController.addConnection);


module.exports = router;

