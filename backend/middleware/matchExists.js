const Joi = require('joi');
const matchingModel = require('../models/matching');

module.exports = (req, res, next) => {
  const { matchId } = req.params;
  const { error } = Joi.string().uuid().validate(matchId);
  if (error) {
    return res.status(400).json({ error: 'Invalid matchId' });
  }
  const match = matchingModel.findMatchById(matchId);
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }
  req.match = match;
  next();
};
