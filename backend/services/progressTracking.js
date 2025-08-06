const logger = require('../utils/logger');
const progressModel = require('../models/progressTracking');

async function getDashboard(userId) {
  const achievements = progressModel.listAchievements(userId);
  const skills = progressModel.listSkills(userId);
  return {
    achievementsCount: achievements.length,
    skillsCount: skills.length,
    recentAchievements: achievements.slice(-5),
    recentSkills: skills.slice(-5),
  };
}

async function logAchievement(data) {
  const record = progressModel.addAchievement(data);
  logger.info('Achievement logged', { userId: data.userId, achievementId: record.id });
  return record;
}

async function getAlerts(userId) {
  const alerts = progressModel.listCustomAlerts(userId);
  if (alerts.length === 0) {
    alerts.push({ message: 'Keep going, you are doing great!' });
  }
  return alerts;
}

async function listSkills(userId) {
  return progressModel.listSkills(userId);
}

async function listAchievements(userId) {
  return progressModel.listAchievements(userId);
}

async function createCustomAlert(data) {
  const alert = progressModel.addCustomAlert(data);
  logger.info('Custom alert created', { userId: data.userId, alertId: alert.id });
  return alert;
}

async function getTimeline(userId) {
  return progressModel.getTimeline(userId);
}

async function addSkill(userId, data) {
  const skill = progressModel.addSkill(userId, data);
  logger.info('Skill added', { userId, skillId: skill.id });
  return skill;
}

async function getSkillById(skillId) {
  return progressModel.getSkillById(skillId);
}

async function updateSkill(skillId, updates) {
  const skill = progressModel.updateSkill(skillId, updates);
  if (!skill) {
    throw new Error('Skill not found');
  }
  logger.info('Skill updated', { skillId });
  return skill;
}

async function listTasks(userId) {
  return progressModel.listTasks(userId);
}

async function addTask(data) {
  const task = progressModel.addTask(data);
  logger.info('Task recorded', { userId: data.userId, taskId: task.id });
  return task;
}

module.exports = {
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
  listTasks,
  addTask,
};
