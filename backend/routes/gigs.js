const express = require('express');
const router = express.Router();
const {
  createGigHandler,
  listGigsHandler,
  getGigHandler,
  updateGigHandler,
  deleteGigHandler,
} = require('../controllers/gig');

router.post('/', createGigHandler);
router.get('/', listGigsHandler);
router.get('/:gigId', getGigHandler);
router.put('/:gigId', updateGigHandler);
router.delete('/:gigId', deleteGigHandler);
const auth = require('../middleware/auth');
const { getMyGigsHandler, getAppliedGigsHandler } = require('../controllers/gigs');

router.get('/my-gigs', auth, getMyGigsHandler);
router.get('/applied', auth, getAppliedGigsHandler);

module.exports = router;
