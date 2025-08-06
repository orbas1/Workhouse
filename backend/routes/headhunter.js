const express = require('express');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const {
  searchJobSeekers,
  getRecommendations,
  getTasks,
  patchTask,
  getJobAllocations,
  postJobAllocation,
  getHeadhunters,
} = require('../controllers/headhunter');

const router = express.Router();

router.get('/search-job-seekers', auth, requireRole('headhunter', 'admin'), searchJobSeekers);
router.get('/recommendations', auth, requireRole('headhunter', 'admin'), getRecommendations);
router.get('/tasks', auth, requireRole('headhunter', 'admin'), getTasks);
router.patch('/tasks/:id', auth, requireRole('headhunter', 'admin'), patchTask);
router.get('/job-allocations', auth, requireRole('headhunter', 'admin'), getJobAllocations);
router.post('/job-allocations', auth, requireRole('headhunter', 'admin'), postJobAllocation);
router.get('/list', auth, requireRole('admin'), getHeadhunters);

module.exports = router;
