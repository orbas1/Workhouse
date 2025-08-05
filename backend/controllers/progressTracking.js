const {
  getDashboard,
  logAchievement,
  getAlerts,
  listSkills,
  listAchievements,
  createCustomAlert,
  getTimeline,
  addSkill,
  updateSkill,
  getSkillById,
} = require('../services/progressTracking');
const logger = require('../utils/logger');

async function getDashboardHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await getDashboard(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to load progress dashboard', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
}

async function logAchievementHandler(req, res) {
  try {
    const record = await logAchievement(req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to log achievement', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getAlertsHandler(req, res) {
  const { userId } = req.params;
  try {
    const alerts = await getAlerts(userId);
    res.json(alerts);
  } catch (err) {
    logger.error('Failed to fetch alerts', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
}

async function listSkillsHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await listSkills(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to list skills', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to list skills' });
  }
}

async function listAchievementsHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await listAchievements(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to list achievements', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to list achievements' });
  }
}

async function createCustomAlertHandler(req, res) {
  try {
    const alert = await createCustomAlert(req.body);
    res.status(201).json(alert);
  } catch (err) {
    logger.error('Failed to create custom alert', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getTimelineHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await getTimeline(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch timeline', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
}

async function addSkillHandler(req, res) {
  const { userId } = req.params;
  try {
    const skill = await addSkill(userId, req.body);
    res.status(201).json(skill);
  } catch (err) {
    logger.error('Failed to add skill', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function updateSkillHandler(req, res) {
  const { skillId } = req.params;
  try {
    const skill = await getSkillById(skillId);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    const isAdmin = req.user?.role === 'admin' || (Array.isArray(req.user?.roles) && req.user.roles.includes('admin'));
    if (!isAdmin && skill.userId !== req.user?.username) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = await updateSkill(skillId, req.body);
    res.json(updated);
  } catch (err) {
    logger.error('Failed to update skill', { error: err.message, skillId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getDashboardHandler,
  logAchievementHandler,
  getAlertsHandler,
  listSkillsHandler,
  listAchievementsHandler,
  createCustomAlertHandler,
  getTimelineHandler,
  addSkillHandler,
  updateSkillHandler,
};
