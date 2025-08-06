const Service = require('../models/service');

exports.createService = (req, res) => {
  const {
    sellerId,
    title,
    description,
    price,
    status,
    category,
    tags,
    businessId,
    providerIds = [],
    commissionSplit,
    serviceArea = [],
  } = req.body;
  if (!sellerId || !title) {
    return res.status(400).json({ error: 'sellerId and title are required' });
  }
  const service = Service.createService({
    sellerId,
    title,
    description,
    price,
    status,
    category,
    tags,
    businessId,
    providerIds,
    commissionSplit,
    serviceArea,
  });
  res.status(201).json(service);
};

exports.listServices = (req, res) => {
  const { sellerId, search, category, minPrice, maxPrice } = req.query;
  if (sellerId) {
    return res.json(Service.listServicesBySeller(sellerId));
  }
  const filters = {
    search,
    category,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  };
  res.json(Service.listAllServices(filters));
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
