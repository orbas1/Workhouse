const express = require('express');
const {
  matchJobsHandler,
  getCriteriaHandler,
} = require('../controllers/matchmaking');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const agency = require('../middleware/agency');
const { matchRequestSchema } = require('../validation/matchmaking');

const router = express.Router();

router.post('/:agencyId/jobs/match', auth, agency, validate(matchRequestSchema), matchJobsHandler);
router.get('/:agencyId/matchmaking/criteria', auth, agency, getCriteriaHandler);

module.exports = router;
