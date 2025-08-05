const { randomUUID } = require('crypto');

const clients = new Map();

function createClient({ agencyId, companyName, contactName, contactEmail, contactPhone, preferences }) {
  const id = randomUUID();
  const timestamp = new Date();
  const client = {
    id,
    agencyId,
    companyName,
    contactName: contactName || null,
    contactEmail: contactEmail || null,
    contactPhone: contactPhone || null,
    preferences: preferences || {},
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  clients.set(id, client);
  return client;
}

function findByAgency(agencyId) {
  return Array.from(clients.values()).filter(c => c.agencyId === agencyId);
}

function findById(id) {
  return clients.get(id);
}

function updateClient(id, updates) {
  const client = clients.get(id);
  if (!client) return null;
  const updated = { ...client, ...updates, updatedAt: new Date() };
  clients.set(id, updated);
  return updated;
}

function removeClient(id) {
  return clients.delete(id);
}

module.exports = {
  createClient,
  findByAgency,
  findById,
  updateClient,
  removeClient,
};
