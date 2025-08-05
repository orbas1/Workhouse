const {
  createAgency,
  getAgencyById,
  updateAgency,
  deleteAgency,
} = require('../models/agency');

async function registerAgency(data) {
  // Potential place for additional business logic, e.g., checking duplicates
  return createAgency(data);
}

async function updateAgencyProfile(id, updates) {
  const updated = updateAgency(id, updates);
  if (!updated) {
    throw new Error('Agency not found');
  }
  return updated;
}

async function fetchAgency(id) {
  const agency = getAgencyById(id);
  if (!agency) {
    throw new Error('Agency not found');
  }
  return agency;
}

async function removeAgency(id) {
  const success = deleteAgency(id);
  if (!success) {
    throw new Error('Agency not found');
  }
}

module.exports = {
  registerAgency,
  updateAgencyProfile,
  fetchAgency,
  removeAgency,
};
