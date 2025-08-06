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
const router = express.Router();
const connectionController = require('../controllers/connectionController');

router.get('/user/:userId', connectionController.getConnections);
router.post('/user/:userId', connectionController.addConnection);
router.put('/:id', connectionController.updateConnection);

module.exports = router;
