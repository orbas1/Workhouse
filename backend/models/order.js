const { randomUUID } = require('crypto');

// In-memory storage for orders
const orders = [];

function createOrder({ buyerId, sellerId, serviceId = null, gigId = null, status = 'pending', description = '' }) {
  const order = {
    id: randomUUID(),
    buyerId,
    sellerId,
    serviceId,
    gigId,
    status,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  orders.push(order);
  return order;
}

function getOrdersByUser(userId) {
  return orders.filter((o) => o.buyerId === userId || o.sellerId === userId);
}

function getOrderById(id) {
  return orders.find((o) => o.id === id);
}

function updateOrder(id, updates) {
  const order = getOrderById(id);
  if (!order) return null;
  Object.assign(order, updates, { updatedAt: new Date() });
  return order;
}

function deleteOrder(id) {
  const index = orders.findIndex((o) => o.id === id);
  if (index !== -1) {
    return orders.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  orders,
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrder,
  deleteOrder,
};
