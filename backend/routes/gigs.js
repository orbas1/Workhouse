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

module.exports = router;
