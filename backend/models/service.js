const { randomUUID } = require('crypto');

const services = [];

function createService({ sellerId, title, description = '', price = 0, status = 'active' }) {
  const service = {
    id: randomUUID(),
    sellerId,
    title,
    description,
    price,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  services.push(service);
  return service;
}

function listServicesBySeller(sellerId) {
  return services.filter((s) => s.sellerId === sellerId);
}

function getServiceById(id) {
  return services.find((s) => s.id === id);
}

function updateService(id, updates) {
  const service = getServiceById(id);
  if (!service) return null;
  Object.assign(service, updates, { updatedAt: new Date() });
  return service;
}

function deleteService(id) {
  const index = services.findIndex((s) => s.id === id);
  if (index !== -1) {
    return services.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  services,
  createService,
  listServicesBySeller,
  getServiceById,
  updateService,
  deleteService,
};
