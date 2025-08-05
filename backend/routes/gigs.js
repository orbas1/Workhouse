const express = require('express');
const router = express.Router();
const {
  createGigHandler,
  listGigsHandler,
  getGigHandler,
  updateGigHandler,
  deleteGigHandler,
  searchGigsHandler,
} = require('../controllers/gig');
const { getMyGigsHandler, getAppliedGigsHandler } = require('../controllers/gigs');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { gigSearchSchema } = require('../validation/gigSearch');

router.post('/', auth, createGigHandler);
router.get('/', auth, listGigsHandler);
router.get('/search', auth, validate(gigSearchSchema, 'query'), searchGigsHandler);
router.get('/my-gigs', auth, getMyGigsHandler);
router.get('/applied', auth, getAppliedGigsHandler);
router.get('/:gigId', auth, getGigHandler);
router.put('/:gigId', auth, updateGigHandler);
router.delete('/:gigId', auth, deleteGigHandler);

module.exports = router;
