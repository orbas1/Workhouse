const { randomUUID } = require('crypto');

const resources = new Map([
  [
    'education',
    [
      {
        id: 'res-1',
        title: 'Startup Guide',
        content: 'Basics of starting a business.',
      },
    ],
  ],
  [
    'funding',
    [
      {
        id: 'res-2',
        title: 'Funding 101',
        content: 'How to secure funding for your venture.',
      },
    ],
  ],
]);

const legalResources = new Map([
  [
    'us',
    [
      {
        id: 'legal-1',
        title: 'US Employment Law',
        content: 'Overview of employment regulations in the United States.',
      },
    ],
  ],
  [
    'eu',
    [
      {
        id: 'legal-2',
        title: 'EU Privacy Rules',
        content: 'Basics of GDPR compliance and data protection.',
      },
    ],
  ],
]);

const fundingSubscriptions = new Map(); // profileId -> subscription
const fundingAlerts = new Map(); // profileId -> [alerts]

const mentors = [
  { id: 'mentor-1', name: 'Alice Johnson', expertise: 'Marketing' },
  { id: 'mentor-2', name: 'Bob Smith', expertise: 'Finance' },
];

const mentorshipApplications = new Map();

function getResourcesByType(type) {
  return resources.get(type) || [];
}

function isValidResourceType(type) {
  return resources.has(type);
}

function getLegalResourcesByRegion(region) {
  return legalResources.get(region) || [];
}

function isValidRegion(region) {
  return legalResources.has(region);
}

function subscribeFunding(profileId, preferences = []) {
  const subscription = { profileId, preferences, subscribedAt: new Date() };
  fundingSubscriptions.set(profileId, subscription);
  if (!fundingAlerts.has(profileId)) {
    fundingAlerts.set(profileId, []);
  }
  return subscription;
}

function isSubscribed(profileId) {
  return fundingSubscriptions.has(profileId);
}

function getFundingAlerts(profileId) {
  return fundingAlerts.get(profileId) || [];
}

function addFundingAlert(profileId, alert) {
  if (!fundingAlerts.has(profileId)) {
    fundingAlerts.set(profileId, []);
  }
  fundingAlerts.get(profileId).push({ id: randomUUID(), ...alert, createdAt: new Date() });
}

function applyMentorship(applicantId, mentorId, message = '') {
  const id = randomUUID();
  const now = new Date();
  const application = { id, applicantId, mentorId, message, status: 'pending', createdAt: now };
  mentorshipApplications.set(id, application);
  return application;
}

function listMentors() {
  return mentors;
}

module.exports = {
  getResourcesByType,
  isValidResourceType,
  getLegalResourcesByRegion,
  isValidRegion,
  subscribeFunding,
  isSubscribed,
  getFundingAlerts,
  addFundingAlert,
  applyMentorship,
  listMentors,
};
