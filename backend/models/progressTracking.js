const { randomUUID } = require('crypto');

// In-memory stores to simulate database tables
const achievements = [];
const skills = [];
const customAlerts = [];
const tasks = [];

function addAchievement({ userId, title, description, achievedAt = new Date() }) {
  const record = {
    id: randomUUID(),
    userId,
    title,
    description: description || null,
    achievedAt,
  };
  achievements.push(record);
  return record;
}

function listAchievements(userId) {
  return achievements.filter((a) => a.userId === userId);
}

function addSkill(userId, { name, level }) {
  const record = {
    id: randomUUID(),
    userId,
    name,
    level,
    obtainedAt: new Date(),
    updatedAt: new Date(),
  };
  skills.push(record);
  return record;
}

function listSkills(userId) {
  return skills.filter((s) => s.userId === userId);
}

function getSkillById(skillId) {
  return skills.find((s) => s.id === skillId);
}

function updateSkill(skillId, updates) {
  const skill = getSkillById(skillId);
  if (!skill) return null;
  Object.assign(skill, updates, { updatedAt: new Date() });
  return skill;
}

function addCustomAlert({ userId, message, frequency }) {
  const record = {
    id: randomUUID(),
    userId,
    message,
    frequency,
    createdAt: new Date(),
  };
  customAlerts.push(record);
  return record;
}

function listCustomAlerts(userId) {
  return customAlerts.filter((a) => a.userId === userId);
}

function getTimeline(userId) {
  const items = [];
  for (const a of achievements) {
    if (a.userId === userId) {
      items.push({ type: 'achievement', date: a.achievedAt, ...a });
    }
  }
  for (const s of skills) {
    if (s.userId === userId) {
      items.push({ type: 'skill', date: s.obtainedAt, ...s });
    }
  }
  return items.sort((x, y) => new Date(x.date) - new Date(y.date));
}

function addTask({ userId, title, summary, completedAt = new Date(), feedback }) {
  const record = {
    id: randomUUID(),
    userId,
    title,
    summary: summary || null,
    completedAt,
    feedback: feedback || null,
  };
  tasks.push(record);
  return record;
}

function listTasks(userId) {
  return tasks.filter((t) => t.userId === userId);
}

module.exports = {
  addAchievement,
  listAchievements,
  addSkill,
  listSkills,
  getSkillById,
  updateSkill,
  addCustomAlert,
  listCustomAlerts,
  getTimeline,
  addTask,
  listTasks,
};
