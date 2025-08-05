const agencies = [];
let idCounter = 1;

function createAgency({ name, services = [], contactEmail }) {
  const newAgency = {
    id: idCounter++,
    name,
    services,
    contactEmail,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  agencies.push(newAgency);
  return newAgency;
}

function getAgencyById(id) {
  return agencies.find(a => a.id === Number(id));
}

function updateAgency(id, updates) {
  const agency = getAgencyById(id);
  if (!agency) return null;
  Object.assign(agency, updates, { updatedAt: new Date() });
  return agency;
}

function deleteAgency(id) {
  const index = agencies.findIndex(a => a.id === Number(id));
  if (index === -1) return false;
  agencies.splice(index, 1);
  return true;
}

module.exports = { agencies, createAgency, getAgencyById, updateAgency, deleteAgency };
