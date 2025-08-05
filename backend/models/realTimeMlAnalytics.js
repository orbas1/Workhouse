const { randomUUID } = require('crypto');

const engagementMetrics = [];

function seedData() {
  if (engagementMetrics.length === 0) {
    engagementMetrics.push(
      {
        id: randomUUID(),
        eventId: 'event-1',
        metrics: { viewers: 120, likes: 45, chatMessages: 30 },
        capturedAt: new Date(),
      },
      {
        id: randomUUID(),
        eventId: 'event-2',
        metrics: { viewers: 80, likes: 20, chatMessages: 15 },
        capturedAt: new Date(),
      }
    );
  }
}

seedData();

function findByEventId(eventId) {
  return engagementMetrics.filter(m => m.eventId === eventId);
}

function eventExists(eventId) {
  return engagementMetrics.some(m => m.eventId === eventId);
}

module.exports = {
  findByEventId,
  eventExists,
};
