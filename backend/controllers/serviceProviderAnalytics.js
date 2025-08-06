const service = require('../services/serviceProviderAnalytics');
const logger = require('../utils/logger');

exports.getAnalytics = (req, res) => {
  try {
    const providerId = req.user.id;
    const analytics = service.getAnalytics(providerId);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to fetch service provider analytics', err);
    res.status(500).json({ error: 'Unable to retrieve analytics' });
  }
};

exports.createService = (req, res) => {
  try {
    const created = service.createService(req.user.id, req.validatedBody);
    res.status(201).json(created);
  } catch (err) {
    logger.error('Failed to create service', err);
    res.status(500).json({ error: 'Unable to create service' });
  }
};

exports.updateService = (req, res) => {
  try {
    const { serviceId } = req.params;
    const updated = service.updateService(req.user.id, serviceId, req.validatedBody);
    if (!updated) {
      return res.status(404).json({ error: 'Service not found or unauthorized' });
    }
    res.json(updated);
  } catch (err) {
    logger.error('Failed to update service', err);
    res.status(500).json({ error: 'Unable to update service' });
  }
};

exports.updatePricing = (req, res) => {
  try {
    const { serviceId } = req.params;
    const { price } = req.validatedBody;
    const updated = service.updatePricing(req.user.id, serviceId, price);
    if (!updated) {
      return res.status(404).json({ error: 'Service not found or unauthorized' });
    }
    res.json(updated);
  } catch (err) {
    logger.error('Failed to update service pricing', err);
    res.status(500).json({ error: 'Unable to update pricing' });
  }
};

exports.setAvailability = (req, res) => {
  try {
    const availability = service.setAvailability(req.user.id, req.validatedBody);
    res.status(201).json(availability);
  } catch (err) {
    logger.error('Failed to set availability', err);
    res.status(500).json({ error: 'Unable to set availability' });
  }
};

exports.createBooking = (req, res) => {
  try {
    const booking = service.createBooking(req.user.id, req.validatedBody);
    res.status(201).json(booking);
  } catch (err) {
    logger.error('Failed to create booking', err);
    res.status(500).json({ error: 'Unable to create booking' });
  }
};

exports.addPortfolioItem = (req, res) => {
  try {
    const item = service.addPortfolioItem(req.user.id, req.validatedBody);
    res.status(201).json(item);
  } catch (err) {
    logger.error('Failed to add portfolio item', err);
    res.status(500).json({ error: 'Unable to add portfolio item' });
  }
};

exports.getPortfolio = (req, res) => {
  try {
    const { providerId } = req.params;
    const portfolio = service.getPortfolio(providerId);
    res.json(portfolio);
  } catch (err) {
    logger.error('Failed to fetch portfolio', err);
    res.status(500).json({ error: 'Unable to retrieve portfolio' });
  }
};

exports.addTestimonial = (req, res) => {
  try {
    const testimonial = service.addTestimonial(req.user.id, req.validatedBody);
    res.status(201).json(testimonial);
  } catch (err) {
    logger.error('Failed to add testimonial', err);
    res.status(500).json({ error: 'Unable to add testimonial' });
  }
};

exports.getTestimonials = (req, res) => {
  try {
    const { providerId } = req.params;
    const testimonials = service.getTestimonials(providerId);
    res.json(testimonials);
  } catch (err) {
    logger.error('Failed to fetch testimonials', err);
    res.status(500).json({ error: 'Unable to retrieve testimonials' });
  }
};

exports.customizeService = (req, res) => {
  try {
    const { serviceId } = req.params;
    const request = service.customizeService(req.user.id, serviceId, req.validatedBody);
    res.status(201).json(request);
  } catch (err) {
    logger.error('Failed to submit customization request', err);
    res.status(500).json({ error: 'Unable to submit customization request' });
  }
};

exports.initiateChat = (req, res) => {
  try {
    const session = service.initiateChat(req.user.id, req.validatedBody);
    res.status(201).json(session);
  } catch (err) {
    logger.error('Failed to initiate chat session', err);
    res.status(500).json({ error: 'Unable to initiate chat' });
  }
};

