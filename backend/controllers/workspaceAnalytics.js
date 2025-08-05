const { getOverview, getDetails, getCollaboration } = require('../services/workspaceAnalytics');
const logger = require('../utils/logger');

async function getOverviewHandler(req, res) {
  try {
    const overview = await getOverview();
    res.json(overview);
  } catch (err) {
    logger.error('Failed to fetch workspace overview', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch workspace overview' });
  }
}

async function getDetailsHandler(req, res) {
  const { workspaceId } = req.params;
  try {
    const details = await getDetails(workspaceId);
    if (!details) {
      return res.status(404).json({ error: 'Workspace analytics not found' });
    }
    res.json(details);
  } catch (err) {
    logger.error('Failed to fetch workspace details', { error: err.message, workspaceId });
    res.status(500).json({ error: 'Failed to fetch workspace details' });
  }
}

async function getCollaborationHandler(req, res) {
  const { workspaceId } = req.params;
  try {
    const collaboration = await getCollaboration(workspaceId);
    if (!collaboration) {
      return res.status(404).json({ error: 'Workspace collaboration analytics not found' });
    }
    res.json(collaboration);
  } catch (err) {
    logger.error('Failed to fetch collaboration analytics', { error: err.message, workspaceId });
    res.status(500).json({ error: 'Failed to fetch collaboration analytics' });
  }
}

module.exports = {
  getOverviewHandler,
  getDetailsHandler,
  getCollaborationHandler,
};
