const dashboard = {
  startups: {
    stats: { total: 12, active: 9 },
    notifications: [
      'Investor Alpha Ventures viewed your profile',
      'Mentor Jane Doe offered guidance'
    ],
    actions: [
      { label: 'Add Business Plan', path: '/startups/profile-plan' },
      { label: 'Browse Investors', path: '/connections' },
      { label: 'Request Mentorship', path: '/connections' }
    ]
  },
  investors: {
    stats: { total: 5, active: 4 },
    notifications: [
      'New startup FinTech Hub seeks funding',
      'Pitch deck from HealthPlus available'
    ],
    actions: [
      { label: 'Browse Startups', path: '/connections' },
      { label: 'Manage Connections', path: '/connections' }
    ]
  },
  mentors: {
    stats: { total: 8, active: 6 },
    notifications: [
      'Startup EcoBuild requested mentorship',
      'You have 2 pending feedback reviews'
    ],
    actions: [
      { label: 'Browse Startups', path: '/connections' },
      { label: 'Manage Mentorships', path: '/connections' }
    ]
  }
};

function getSimDashboard() {
  return dashboard;
}

module.exports = { getSimDashboard };
