const resources = [
  {
    id: 1,
    title: 'Getting Started Guide',
    url: 'https://example.com/getting-started'
  },
  {
    id: 2,
    title: 'Promo Best Practices',
    url: 'https://example.com/promo-best-practices'
  }
];

const registrations = [];

function getResources() {
  return resources;
}

function addRegistration(registration) {
  registrations.push(registration);
}

function findRegistration(affiliateId, webinarId) {
  return registrations.find(r => r.affiliateId === affiliateId && r.webinarId === webinarId);
}

module.exports = {
  getResources,
  addRegistration,
  findRegistration
};
