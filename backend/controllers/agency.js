const {
  registerAgency,
  updateAgencyProfile,
  fetchAgency,
  removeAgency,
} = require('../services/agency');

async function registerHandler(req, res) {
  try {
    const agency = await registerAgency(req.body);
    res.status(201).json(agency);
  } catch (err) {
    console.error('Failed to register agency:', err);
    res.status(400).json({ error: err.message });
  }
}

async function updateHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const agency = await updateAgencyProfile(agencyId, req.body);
    res.json(agency);
  } catch (err) {
    console.error('Failed to update agency:', err);
    res.status(404).json({ error: err.message });
  }
}

async function getHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const agency = await fetchAgency(agencyId);
    res.json(agency);
  } catch (err) {
    console.error('Failed to fetch agency:', err);
    res.status(404).json({ error: err.message });
  }
}

async function deleteHandler(req, res) {
  const { agencyId } = req.params;
  try {
    await removeAgency(agencyId);
    res.status(204).send();
  } catch (err) {
    console.error('Failed to delete agency:', err);
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  registerHandler,
  updateHandler,
  getHandler,
  deleteHandler,
};
