const express = require('express');
const { acceptJobHandler, assignJobHandler } = require('../controllers/job');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const jobMiddleware = require('../middleware/job');
const { jobIdParamSchema, assignmentParamSchema } = require('../validation/job');

const router = express.Router();

router.post('/:jobId/accept', auth, validate(jobIdParamSchema, 'params'), jobMiddleware, acceptJobHandler);
router.post('/:jobId/assign/:employeeId', auth, validate(assignmentParamSchema, 'params'), jobMiddleware, assignJobHandler);
const {
  createJobHandler,
  listJobsHandler,
  updateJobHandler,
  deleteJobHandler,
  getJobApplicationsHandler,
} = require('../controllers/job');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const jobOwnership = require('../middleware/jobOwnership');
const { createJobSchema, updateJobSchema } = require('../validation/job');

const router = express.Router();

router.post('/:agencyId/jobs/create', auth, validate(createJobSchema), createJobHandler);
router.get('/:agencyId/jobs', auth, listJobsHandler);
router.put('/:agencyId/jobs/update/:jobId', auth, jobOwnership, validate(updateJobSchema), updateJobHandler);
router.delete('/:agencyId/jobs/delete/:jobId', auth, jobOwnership, deleteJobHandler);
router.get('/:agencyId/jobs/:jobId/applications', auth, jobOwnership, getJobApplicationsHandler);

module.exports = router;
