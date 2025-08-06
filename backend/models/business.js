const { randomUUID } = require('crypto');

// In-memory business store. A business extends a user account and can manage
// multiple providers and services within a specific service zone.
const businesses = new Map();

function createBusiness({ ownerId, name, zone = [] }) {
  const id = randomUUID();
  const business = { id, ownerId, name, providers: [], services: [], zone };
  businesses.set(id, business);
  return business;
}

function addProvider(businessId, userId) {
  const business = businesses.get(businessId);
  if (!business) return null;
  if (!business.providers.includes(userId)) {
    business.providers.push(userId);
  }
  return business;
}

function assignService(businessId, serviceId) {
  const business = businesses.get(businessId);
  if (!business) return null;
  if (!business.services.includes(serviceId)) {
    business.services.push(serviceId);
  }
  return business;
}

function setZone(businessId, zone) {
  const business = businesses.get(businessId);
  if (!business) return null;
  business.zone = zone;
  return business;
}

module.exports = { businesses, createBusiness, addProvider, assignService, setZone };
