const { randomUUID } = require('crypto');

// In-memory stores for demonstration purposes
const profiles = new Map(); // userId -> { id, role, skills, interests, industry, location, fundingStage, expertise, experience, salary }
const invitations = new Map(); // invitationId -> invitation object
const matches = [];
const trialSessions = [];

function addProfile(profile) {
  const record = {
    id: randomUUID(),
    skills: [],
    interests: [],
    industry: null,
    location: null,
    fundingStage: null,
    expertise: null,
    experience: 0,
    salary: null,
    ...profile,
  };
  profiles.set(record.id, record);
  return record;
}

function getProfile(userId) {
  return profiles.get(userId);
}

function searchProfiles({
  role,
  skills = [],
  industry,
  location,
  fundingStage,
  expertise,
  minExperience,
  maxSalary,
  search,
}) {
  let results = Array.from(profiles.values());
  if (role) results = results.filter((p) => p.role === role);
  if (industry) results = results.filter((p) => p.industry === industry);
  if (location) results = results.filter((p) => p.location === location);
  if (fundingStage) results = results.filter((p) => p.fundingStage === fundingStage);
  if (expertise) results = results.filter((p) => p.expertise === expertise);
  if (skills.length) {
    results = results.filter((p) => skills.every((s) => p.skills.includes(s)));
  }
  if (minExperience !== undefined) {
    results = results.filter((p) => p.experience >= Number(minExperience));
  }
  if (maxSalary !== undefined) {
    results = results.filter((p) => p.salary !== null && p.salary <= Number(maxSalary));
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (p) =>
        (p.fullName || '').toLowerCase().includes(q) ||
        (p.skills || []).some((s) => s.toLowerCase().includes(q))
    );
  }
  // scoring for advanced matching
  results = results
    .map((p) => {
      let score = 0;
      if (skills.length) {
        const overlap = skills.filter((s) => p.skills.includes(s)).length;
        score += overlap;
      }
      if (industry && p.industry === industry) score += 1;
      if (location && p.location === location) score += 1;
      if (search) {
        const q = search.toLowerCase();
        if ((p.fullName || '').toLowerCase().includes(q)) score += 1;
        if ((p.skills || []).some((s) => s.toLowerCase().includes(q))) score += 1;
      }
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score);
  return results;
}

function createInvitation({ senderId, recipientId, message }) {
  const invitation = {
    id: randomUUID(),
    senderId,
    recipientId,
    message: message || null,
    status: 'pending',
    createdAt: new Date(),
  };
  invitations.set(invitation.id, invitation);
  return invitation;
}

function findInvitation(invitationId) {
  return invitations.get(invitationId);
}

function updateInvitation(invitationId, updates) {
  const invitation = invitations.get(invitationId);
  if (!invitation) return null;
  Object.assign(invitation, updates);
  invitations.set(invitationId, invitation);
  return invitation;
}

function createMatch({ mentorId, menteeId, score }) {
  const match = {
    id: randomUUID(),
    mentorId,
    menteeId,
    score: score ?? null,
    createdAt: new Date(),
  };
  matches.push(match);
  return match;
}

function createTrialSession({ mentorId, menteeId, scheduledAt }) {
  const session = {
    id: randomUUID(),
    mentorId,
    menteeId,
    scheduledAt: new Date(scheduledAt),
    createdAt: new Date(),
  };
  trialSessions.push(session);
  return session;
}

function getMatchHistory(userId) {
  return matches.filter((m) => m.mentorId === userId || m.menteeId === userId);
}

function getManualMatches(userId) {
  const profile = profiles.get(userId);
  if (!profile) return [];
  const oppositeRole = profile.role === 'mentor' ? 'mentee' : 'mentor';
  return searchProfiles({ role: oppositeRole });
}

function runAutoMatching() {
  const mentees = searchProfiles({ role: 'mentee' });
  const mentors = searchProfiles({ role: 'mentor' });
  const newMatches = [];

  mentees.forEach((mentee) => {
    if (matches.some((m) => m.menteeId === mentee.id)) return;
    let bestMentor = null;
    let bestScore = 0;
    mentors.forEach((mentor) => {
      const overlap = mentor.skills.filter((s) => mentee.skills.includes(s)).length;
      const score = mentee.skills.length ? overlap / mentee.skills.length : 0;
      if (score > bestScore) {
        bestScore = score;
        bestMentor = mentor;
      }
    });
    if (bestMentor) {
      const match = createMatch({ mentorId: bestMentor.id, menteeId: mentee.id, score: Number(bestScore.toFixed(2)) });
      newMatches.push(match);
    }
  });
  return newMatches;
}

module.exports = {
  addProfile,
  getProfile,
  searchProfiles,
  createInvitation,
  findInvitation,
  updateInvitation,
  createMatch,
  createTrialSession,
  getMatchHistory,
  getManualMatches,
  runAutoMatching,
};

