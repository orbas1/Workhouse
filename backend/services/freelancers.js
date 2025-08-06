const profileModel = require('../models/profile');

async function searchFreelancers({ query, location, minRate, maxRate, minExperience }) {
  const q = query ? query.toLowerCase() : '';
  return profileModel.profiles.filter((p) => {
    if (q) {
      const nameMatch = (p.fullName || '').toLowerCase().includes(q) || (p.title || '').toLowerCase().includes(q);
      const skillMatch = (p.skills || []).some((s) => s.toLowerCase().includes(q));
      if (!nameMatch && !skillMatch) return false;
    }
    if (location && (!p.location || !p.location.toLowerCase().includes(location.toLowerCase()))) {
      return false;
    }
    if (minRate !== undefined && p.hourlyRate < minRate) {
      return false;
    }
    if (maxRate !== undefined && p.hourlyRate > maxRate) {
      return false;
    }
    if (minExperience !== undefined && p.experienceYears < minExperience) {
      return false;
    }
    return true;
  });
}

module.exports = { searchFreelancers };
