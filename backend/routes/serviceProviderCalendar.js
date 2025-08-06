const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceProviderCalendar');

router.post('/', controller.createEvent);
router.get('/', controller.listEvents);
router.put('/:id', controller.updateEvent);
router.delete('/:id', controller.deleteEvent);

module.exports = router;
