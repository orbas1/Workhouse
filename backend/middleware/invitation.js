const Joi = require('joi');
const matchingModel = require('../models/matchingEngine');

module.exports = (req, res, next) => {
  const schema = Joi.string().uuid();
  const { invitationId } = req.params;
  const { error } = schema.validate(invitationId);
  if (error) {
    return res.status(400).json({ error: 'Invalid invitationId' });
  }
  const invitation = matchingModel.findInvitation(invitationId);
  if (!invitation) {
    return res.status(404).json({ error: 'Invitation not found' });
  }
  req.invitation = invitation;
  next();
};

