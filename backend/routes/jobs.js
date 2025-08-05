const express = require('express');
const { acceptJobHandler, assignJobHandler } = require('../controllers/job');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const jobMiddleware = require('../middleware/job');
const { jobIdParamSchema, assignmentParamSchema } = require('../validation/job');

const router = express.Router();

router.post('/:jobId/accept', auth, validate(jobIdParamSchema, 'params'), jobMiddleware, acceptJobHandler);
router.post('/:jobId/assign/:employeeId', auth, validate(assignmentParamSchema, 'params'), jobMiddleware, assignJobHandler);

module.exports = router;
