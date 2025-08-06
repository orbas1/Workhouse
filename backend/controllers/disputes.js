const disputeModel = require('../models/dispute');
const messageModel = require('../models/disputeMessage');

async function getDisputeDetails(req, res) {
  const { disputeId } = req.params;
  const dispute = disputeModel.findById(disputeId);
  if (!dispute) {
    return res.status(404).json({ error: 'Dispute not found' });
  }
  const messages = messageModel.getMessagesByDisputeId(disputeId);
  res.json({ ...dispute, messages });
}

async function postDisputeMessage(req, res) {
  const { disputeId } = req.params;
  const { message } = req.body;
  const dispute = disputeModel.findById(disputeId);
  if (!dispute) {
    return res.status(404).json({ error: 'Dispute not found' });
  }
  const senderId = req.user?.id || 'anonymous';
  const entry = messageModel.addMessage(disputeId, senderId, message);
  res.status(201).json(entry);
}

module.exports = {
  getDisputeDetails,
  postDisputeMessage,
};
