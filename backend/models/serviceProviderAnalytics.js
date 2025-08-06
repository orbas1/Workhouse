const { randomUUID } = require('crypto');

const services = [];
const availabilities = [];
const bookings = [];
const portfolioItems = [];
const testimonials = [];
const customizationRequests = [];
const chatSessions = [];

function findServiceById(id) {
  return services.find(s => s.id === id);
}

function createService(providerId, { title, description, tags = [], category, price }) {
  const now = new Date();
  const service = {
    id: randomUUID(),
    providerId,
    title,
    description,
    tags,
    category,
    price,
    createdAt: now,
    updatedAt: now,
  };
  services.push(service);
  return service;
}

function updateService(providerId, serviceId, data) {
  const service = services.find(s => s.id === serviceId && s.providerId === providerId);
  if (!service) return null;
  Object.assign(service, data, { updatedAt: new Date() });
  return service;
}

function updateServicePricing(providerId, serviceId, price) {
  const service = services.find(s => s.id === serviceId && s.providerId === providerId);
  if (!service) return null;
  service.price = price;
  service.updatedAt = new Date();
  return service;
}

function addAvailability(providerId, { date, slots }) {
  const entry = { id: randomUUID(), providerId, date: new Date(date), slots, createdAt: new Date() };
  availabilities.push(entry);
  return entry;
}

function createBooking(clientId, { providerId, serviceId, date }) {
  const booking = {
    id: randomUUID(),
    clientId,
    providerId,
    serviceId,
    date: new Date(date),
    status: 'pending',
    createdAt: new Date(),
  };
  bookings.push(booking);
  return booking;
}

function addPortfolioItem(providerId, { title, description, mediaUrl }) {
  const item = { id: randomUUID(), providerId, title, description, mediaUrl, createdAt: new Date() };
  portfolioItems.push(item);
  return item;
}

function getPortfolioByProvider(providerId) {
  return portfolioItems.filter(p => p.providerId === providerId);
}

function addTestimonial(clientId, { providerId, rating, comment }) {
  const testimonial = {
    id: randomUUID(),
    providerId,
    clientId,
    rating,
    comment,
    createdAt: new Date(),
  };
  testimonials.push(testimonial);
  return testimonial;
}

function getTestimonialsByProvider(providerId) {
  return testimonials.filter(t => t.providerId === providerId);
}

function addCustomizationRequest(clientId, serviceId, { details }) {
  const request = {
    id: randomUUID(),
    serviceId,
    clientId,
    details,
    createdAt: new Date(),
  };
  customizationRequests.push(request);
  return request;
}

function createChatSession(userId, { providerId, message }) {
  const session = {
    id: randomUUID(),
    providerId,
    clientId: userId,
    messages: [ { senderId: userId, message, timestamp: new Date() } ],
    createdAt: new Date(),
  };
  chatSessions.push(session);
  return session;
}

function computeAnalytics(providerId) {
  const providerBookings = bookings.filter(b => b.providerId === providerId);
  const revenue = providerBookings.reduce((sum, b) => {
    const service = findServiceById(b.serviceId);
    return sum + (service ? service.price : 0);
  }, 0);
  return {
    totalServices: services.filter(s => s.providerId === providerId).length,
    totalBookings: providerBookings.length,
    revenue,
    rating:
      testimonials
        .filter(t => t.providerId === providerId)
        .reduce((sum, t, _, arr) => sum + t.rating / arr.length, 0),
  };
}

module.exports = {
  services,
  availabilities,
  bookings,
  portfolioItems,
  testimonials,
  customizationRequests,
  chatSessions,
  createService,
  updateService,
  findServiceById,
  updateServicePricing,
  addAvailability,
  createBooking,
  addPortfolioItem,
  getPortfolioByProvider,
  addTestimonial,
  getTestimonialsByProvider,
  addCustomizationRequest,
  createChatSession,
  computeAnalytics,
};
