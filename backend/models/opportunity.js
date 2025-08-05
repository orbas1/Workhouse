const { randomUUID } = require('crypto');

const opportunities = new Map();

function create({
  organizationId,
  title,
  description,
  location = '',
  remote = false,
  commitmentTime = '',
  urgency = 'normal',
  requirements = '',
  multimedia = [],
  isFeatured = false,
  category = '',
  duration = '',
  compensation = 0,
  experienceLevel = '',
  status = 'open',
}) {
  const id = randomUUID();
  const now = new Date();
  const opportunity = {
    id,
    organizationId,
    title,
    description,
    location,
    remote,
    commitmentTime,
    urgency,
    requirements,
    multimedia,
    views: 0,
    applications: 0,
    matches: 0,
    isFeatured,
    category,
    duration,
    compensation,
    experienceLevel,
    status,
    deleted: false,
    createdAt: now,
    updatedAt: now,
  };
  opportunities.set(id, opportunity);
  return opportunity;
}

function findById(id) {
  const opportunity = opportunities.get(id);
  if (!opportunity || opportunity.deleted) return null;
  return opportunity;
}

function list() {
  return Array.from(opportunities.values()).filter(o => !o.deleted);
}

function update(id, updates) {
  const opportunity = opportunities.get(id);
  if (!opportunity || opportunity.deleted) return null;
  Object.assign(opportunity, updates, { updatedAt: new Date() });
  opportunities.set(id, opportunity);
  return opportunity;
}

function softDelete(id) {
  const opportunity = opportunities.get(id);
  if (opportunity) {
    opportunity.deleted = true;
    opportunity.updatedAt = new Date();
  }
}

function incrementView(id) {
  const opportunity = opportunities.get(id);
  if (!opportunity || opportunity.deleted) return null;
  opportunity.views += 1;
  return opportunity;
}

module.exports = {
  create,
  findById,
  list,
  update,
  softDelete,
  incrementView,
};
