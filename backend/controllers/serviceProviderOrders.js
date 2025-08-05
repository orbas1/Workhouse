const Order = require('../models/order');

exports.createOrder = (req, res) => {
  const { buyerId, sellerId, serviceId, status, description } = req.body;
  if (!buyerId || !sellerId || !serviceId) {
    return res.status(400).json({ error: 'buyerId, sellerId and serviceId are required' });
  }
  const order = Order.createOrder({ buyerId, sellerId, serviceId, status, description });
  res.status(201).json(order);
};

exports.listOrders = (req, res) => {
  const { userId } = req.query;
  const data = userId ? Order.getOrdersByUser(userId) : Order.orders;
  res.json(data);
};

exports.getOrderById = (req, res) => {
  const order = Order.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
};

exports.updateOrder = (req, res) => {
  const order = Order.updateOrder(req.params.id, req.body);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
};

exports.deleteOrder = (req, res) => {
  const order = Order.deleteOrder(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
};
