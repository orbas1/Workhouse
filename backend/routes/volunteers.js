const express = require('express');
const {
  createVolunteerHandler,
  getVolunteerProfileHandler,
  updateVolunteerProfileHandler,
  matchVolunteerHandler,
} = require('../controllers/volunteer');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  preventDuplicateProfile,
  ensureVolunteerExists,
} = require('../middleware/volunteer');
const {
  volunteerCreateSchema,
  volunteerUpdateSchema,
} = require('../validation/volunteer');

const router = express.Router();

router.use(auth);

router.post('/', preventDuplicateProfile, validate(volunteerCreateSchema), createVolunteerHandler);
router.get('/profile', ensureVolunteerExists, getVolunteerProfileHandler);
router.put('/profile', ensureVolunteerExists, validate(volunteerUpdateSchema), updateVolunteerProfileHandler);
router.get('/match', ensureVolunteerExists, matchVolunteerHandler);

module.exports = router;
