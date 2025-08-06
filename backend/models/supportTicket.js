const { randomUUID } = require('crypto');

const tickets = new Map();

function createTicket({ userId, subject, message, status = 'open', createdAt = new Date(), updatedAt = new Date() }) {
  const id = randomUUID();
  const ticket = { id, userId, subject, message, status, createdAt, updatedAt };
  tickets.set(id, ticket);
  return ticket;
}

function findAll() {
  return Array.from(tickets.values());
}

function findById(id) {
  return tickets.get(id);
}

function updateStatus(id, status) {
  const ticket = tickets.get(id);
  if (!ticket) return null;
  ticket.status = status;
  ticket.updatedAt = new Date();
  return ticket;
}

module.exports = {
  createTicket,
  findAll,
  findById,
  updateStatus,
};
