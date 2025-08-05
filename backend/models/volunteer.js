const { randomUUID } = require('crypto');

const volunteers = new Map(); // userId -> profile

const opportunities = [
  {
    id: 'opp-1',
    title: 'Community Cleanup',
    requiredSkills: ['organization', 'teamwork'],
    cause: 'environment',
    commitmentHours: 5,
  },
  {
    id: 'opp-2',
    title: 'Coding for Nonprofit',
    requiredSkills: ['javascript'],
    cause: 'education',
    commitmentHours: 10,
  },
];

function createVolunteer(userId, { skills = [], interests = [], availability = {} }) {
  const now = new Date();
  const profile = {
    id: randomUUID(),
    userId,
    skills,
    interests,
    availability,
    badges: [],
    createdAt: now,
    updatedAt: now,
  };
  volunteers.set(userId, profile);
  return profile;
}

function getVolunteerByUserId(userId) {
  return volunteers.get(userId);
}

function updateVolunteer(userId, updates) {
  const profile = volunteers.get(userId);
  if (!profile) {
    return null;
  }
  Object.assign(profile, updates, { updatedAt: new Date() });
  volunteers.set(userId, profile);
  return profile;
}

function volunteerExists(userId) {
  return volunteers.has(userId);
}

function findMatches(userId) {
  const profile = volunteers.get(userId);
  if (!profile) {
    return [];
  }
  return opportunities.filter((opp) => {
    const skillMatch = opp.requiredSkills.some((s) => profile.skills.includes(s));
    const interestMatch = profile.interests.includes(opp.cause);
    return skillMatch || interestMatch;
  });
}

module.exports = {
  createVolunteer,
  getVolunteerByUserId,
  updateVolunteer,
  volunteerExists,
  findMatches,
};
