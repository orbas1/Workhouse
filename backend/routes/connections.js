const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');

// List all connections for a user
router.get('/user/:userId', connectionController.getConnections);

// Create a new connection for a user
router.post('/user/:userId', connectionController.addConnection);

// Update an existing connection
router.put('/:id', connectionController.updateConnection);

module.exports = router;

