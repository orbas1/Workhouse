const flaggedContent = require('../models/flaggedContent');

function listFlags(req, res) {
  const { status } = req.query;
  res.json(flaggedContent.listFlags(status));
}

function createFlag(req, res) {
  const { contentId, reason } = req.body;
  if (!contentId || !reason) {
    return res.status(400).json({ error: 'contentId and reason are required' });
  }
  const reporterId = req.user?.id || 'anonymous';
  const flag = flaggedContent.flagContent({ contentId, reporterId, reason });
  res.status(201).json(flag);
}

function resolveFlag(req, res) {
  const { id } = req.params;
  const flag = flaggedContent.updateFlagStatus(id, 'resolved');
  if (!flag) {
    return res.status(404).json({ error: 'Flag not found' });
  }
  res.json(flag);
}

module.exports = { listFlags, createFlag, resolveFlag };
