const supportTickets = require('../models/supportTicket');
const disputes = require('../models/dispute');

function listTickets(req, res) {
  res.json(supportTickets.findAll());
}

function createTicket(req, res) {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: 'Subject and message are required' });
  }
  const userId = req.user?.id || 'anonymous';
  const ticket = supportTickets.createTicket({ userId, subject, message });
  res.status(201).json(ticket);
}

function resolveTicket(req, res) {
  const { id } = req.params;
  const ticket = supportTickets.updateStatus(id, 'resolved');
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }
  res.json(ticket);
}

function listDisputes(req, res) {
  res.json(disputes.findAll());
}

module.exports = {
  listTickets,
  createTicket,
  resolveTicket,
  listDisputes,
};
