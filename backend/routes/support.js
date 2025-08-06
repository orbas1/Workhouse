const express = require('express');
const { listTickets, createTicket, resolveTicket, listDisputes } = require('../controllers/support');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/tickets', auth, authorize('support', 'admin'), listTickets);
router.post('/tickets', auth, createTicket);
router.put('/tickets/:id/resolve', auth, authorize('support', 'admin'), resolveTicket);
router.get('/disputes', auth, authorize('dispute-manager', 'admin', 'support'), listDisputes);

module.exports = router;
