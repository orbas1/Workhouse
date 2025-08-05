const clientModel = require('../models/client');
const logger = require('../utils/logger');

async function addClient(data) {
  const client = clientModel.createClient(data);
  logger.info('Client added', { clientId: client.id, agencyId: client.agencyId });
  return client;
}

async function listClients(agencyId) {
  return clientModel.findByAgency(agencyId);
}

async function updateClient(clientId, updates) {
  const client = clientModel.updateClient(clientId, updates);
  if (!client) {
    throw new Error('Client not found');
  }
  logger.info('Client updated', { clientId });
  return client;
}

async function removeClient(clientId) {
  const removed = clientModel.removeClient(clientId);
  if (!removed) {
    throw new Error('Client not found');
  }
  logger.info('Client removed', { clientId });
  return { success: true };
}

module.exports = {
  addClient,
  listClients,
  updateClient,
  removeClient,
};
