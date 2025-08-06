const Service = require('../models/service');

exports.createService = (req, res) => {
  const { sellerId, title, description, price, status } = req.body;
  if (!sellerId || !title) {
    return res.status(400).json({ error: 'sellerId and title are required' });
  }
  const service = Service.createService({ sellerId, title, description, price, status });
  res.status(201).json(service);
};

exports.listServices = (req, res) => {
  const { sellerId } = req.query;
  const data = sellerId ? Service.listServicesBySeller(sellerId) : Service.services;
  res.json(data);
};

exports.getServiceById = (req, res) => {
  const service = Service.getServiceById(req.params.id);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
};

exports.updateService = (req, res) => {
  const service = Service.updateService(req.params.id, req.body);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
};

exports.deleteService = (req, res) => {
  const service = Service.deleteService(req.params.id);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
};
