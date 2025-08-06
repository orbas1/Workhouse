const marketplace = require('../models/taskMarketplace');

describe('task marketplace model', () => {
  test('supports task creation, bidding and distance matching', () => {
    const task = marketplace.createTask({
      title: 'Fix sink',
      creatorId: 'u1',
      price: 100,
      postcode: '2000',
      location: { lat: -33.86, lng: 151.21 },
    });
    const proposal = marketplace.createProposal({ taskId: task.id, bidderId: 'u2', amount: 90 });
    const result = marketplace.acceptProposal(task.id, proposal.id);
    expect(result.task.assignees).toContain('u2');
    const nearby = marketplace.findTasksNearby({ lat: -33.86, lng: 151.2, radiusKm: 5 });
    expect(nearby.find((t) => t.id === task.id)).toBeTruthy();
  });
});
