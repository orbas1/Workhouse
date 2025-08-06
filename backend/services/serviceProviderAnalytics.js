const model = require('../models/serviceProviderAnalytics');
const logger = require('../utils/logger');

function getAnalytics(providerId) {
  logger.info('Fetching analytics', { providerId });
  return model.computeAnalytics(providerId);
}

function createService(providerId, data) {
  logger.info('Creating service', { providerId });
  return model.createService(providerId, data);
}

function updateService(providerId, serviceId, data) {
  logger.info('Updating service', { providerId, serviceId });
  return model.updateService(providerId, serviceId, data);
}

function updatePricing(providerId, serviceId, price) {
  logger.info('Updating pricing', { providerId, serviceId, price });
  return model.updateServicePricing(providerId, serviceId, price);
}

function setAvailability(providerId, availability) {
  logger.info('Setting availability', { providerId });
  return model.addAvailability(providerId, availability);
}

function createBooking(clientId, bookingData) {
  logger.info('Creating booking', { clientId, providerId: bookingData.providerId });
  return model.createBooking(clientId, bookingData);
}

function addPortfolioItem(providerId, data) {
  logger.info('Adding portfolio item', { providerId });
  return model.addPortfolioItem(providerId, data);
}

function getPortfolio(providerId) {
  logger.info('Retrieving portfolio', { providerId });
  return model.getPortfolioByProvider(providerId);
}

function addTestimonial(clientId, data) {
  logger.info('Adding testimonial', { providerId: data.providerId, clientId });
  return model.addTestimonial(clientId, data);
}

function getTestimonials(providerId) {
  logger.info('Retrieving testimonials', { providerId });
  return model.getTestimonialsByProvider(providerId);
}

function customizeService(clientId, serviceId, data) {
  logger.info('Submitting customization request', { clientId, serviceId });
  return model.addCustomizationRequest(clientId, serviceId, data);
}

function initiateChat(clientId, data) {
  logger.info('Initiating chat', { clientId, providerId: data.providerId });
  return model.createChatSession(clientId, data);
}

module.exports = {
  getAnalytics,
  createService,
  updateService,
  updatePricing,
  setAvailability,
  createBooking,
  addPortfolioItem,
  getPortfolio,
  addTestimonial,
  getTestimonials,
  customizeService,
  initiateChat,
};
