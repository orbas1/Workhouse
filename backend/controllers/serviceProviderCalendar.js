const CalendarEvent = require('../models/calendarEvent');

exports.createEvent = (req, res) => {
  const { sellerId, buyerId, serviceId, startTime, endTime, status } = req.body;
  if (!sellerId || !startTime || !endTime) {
    return res.status(400).json({ error: 'sellerId, startTime, and endTime are required' });
  }
  const event = CalendarEvent.createEvent({ sellerId, buyerId, serviceId, startTime, endTime, status });
  res.status(201).json(event);
};

exports.listEvents = (req, res) => {
  const { userId } = req.query;
  const data = userId ? CalendarEvent.getEventsByUser(userId) : CalendarEvent.events;
  res.json(data);
};

exports.updateEvent = (req, res) => {
  const event = CalendarEvent.updateEvent(req.params.id, req.body);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
};

exports.deleteEvent = (req, res) => {
  const event = CalendarEvent.deleteEvent(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
};
