const express = require('express');
const { listJobsHandler, getJobHandler } = require('../controllers/publicJob');

const router = express.Router();

router.get('/', listJobsHandler);
router.get('/:jobId', getJobHandler);

module.exports = router;
