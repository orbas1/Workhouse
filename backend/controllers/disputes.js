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
const { createDispute, addResponse, findById } = require('../models/dispute');

async function createDisputeHandler(req, res) {
  try {
    const userId = req.user?.id || req.body.userId;
    const dispute = createDispute({
      userId,
      disputeeId: req.body.disputeeId,
      category: req.body.type,
      description: req.body.description,
      resolutionRequest: req.body.resolutionRequest,
      attachments: req.body.attachments || [],
    });
    res.status(201).json(dispute);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create dispute' });
  }
}

async function respondToDisputeHandler(req, res) {
  try {
    const { disputeId } = req.params;
    const dispute = addResponse(disputeId, {
      responderId: req.user?.id || req.body.responderId,
      counterArgument: req.body.counterArgument,
      resolution: req.body.resolution,
      attachments: req.body.attachments || [],
    });
    if (!dispute) {
      return res.status(404).json({ error: 'Dispute not found' });
    }
    res.json(dispute);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit response' });
  }
}

async function getDisputeHandler(req, res) {
  try {
    const dispute = findById(req.params.disputeId);
    if (!dispute) {
      return res.status(404).json({ error: 'Dispute not found' });
    }
    res.json(dispute);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dispute' });
  }
}

module.exports = {
  createDisputeHandler,
  respondToDisputeHandler,
  getDisputeHandler,
};
