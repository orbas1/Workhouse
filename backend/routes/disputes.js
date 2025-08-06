const express = require('express');
const router = express.Router();
const disputeModel = require('../models/dispute');

// List disputes; optionally filter by user
router.get('/', (req, res) => {
  const { userId } = req.query;
  let disputes = disputeModel.findAll();
  if (userId) {
    disputes = disputes.filter(d => d.userId === userId);
  }
  res.json(disputes);
});

module.exports = router;
