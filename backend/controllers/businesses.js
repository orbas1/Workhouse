const Business = require('../models/business');

exports.createBusiness = (req, res) => {
  const { ownerId, name, zone = [] } = req.body;
  if (!ownerId || !name) {
    return res.status(400).json({ error: 'ownerId and name are required' });
  }
  const business = Business.createBusiness({ ownerId, name, zone });
  res.status(201).json(business);
};

exports.addProvider = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const business = Business.addProvider(id, userId);
  if (!business) return res.status(404).json({ error: 'Business not found' });
  res.json(business);
};

exports.setZone = (req, res) => {
  const { id } = req.params;
  const { zone } = req.body;
  const business = Business.setZone(id, zone);
  if (!business) return res.status(404).json({ error: 'Business not found' });
  res.json(business);
};
