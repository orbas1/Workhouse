const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');

router.get('/user/:userId', connectionController.getConnections);
router.post('/user/:userId', connectionController.addConnection);
router.put('/:id', connectionController.updateConnection);

module.exports = router;
