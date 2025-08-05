const {
  addClient,
  listClients,
  updateClient,
  removeClient,
} = require('../services/client');
const logger = require('../utils/logger');

async function addClientHandler(req, res) {
  try {
    const client = await addClient(req.body);
    res.status(201).json(client);
  } catch (err) {
    logger.error('Failed to add client', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listClientsHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const clients = await listClients(agencyId);
    res.json(clients);
  } catch (err) {
    logger.error('Failed to list clients', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function updateClientHandler(req, res) {
  const { clientId } = req.params;
  try {
    const client = await updateClient(clientId, req.body);
    res.json(client);
  } catch (err) {
    logger.error('Failed to update client', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function removeClientHandler(req, res) {
  const { clientId } = req.params;
  try {
    await removeClient(clientId);
    res.json({ success: true });
  } catch (err) {
    logger.error('Failed to remove client', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  addClientHandler,
  listClientsHandler,
  updateClientHandler,
  removeClientHandler,
};
