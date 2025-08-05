const express = require('express');
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
