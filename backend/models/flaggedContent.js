const { randomUUID } = require('crypto');

const flags = new Map();

function flagContent({ contentId, reporterId, reason, status = 'pending', createdAt = new Date(), reviewedAt = null }) {
  const id = randomUUID();
  const flag = { id, contentId, reporterId, reason, status, createdAt, reviewedAt };
  flags.set(id, flag);
  return flag;
}

function listFlags(status) {
  const all = Array.from(flags.values());
  return status ? all.filter((f) => f.status === status) : all;
}

function updateFlagStatus(id, status) {
  const flag = flags.get(id);
  if (!flag) return null;
  flag.status = status;
  flag.reviewedAt = new Date();
  return flag;
}

module.exports = { flagContent, listFlags, updateFlagStatus };
