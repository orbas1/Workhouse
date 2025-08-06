const { searchGigs } = require('./gig');
const { searchFreelancers } = require('./freelancers');
const matchingEngine = require('./matchingEngine');

function collectSuggestions(query, items, fields) {
  const q = query.toLowerCase();
  const suggestions = [];
  items.forEach((item) => {
    for (const f of fields) {
      const val = (item[f] || '').toString().toLowerCase();
      if (val.startsWith(q) && val) {
        suggestions.push(val);
        break;
      }
    }
  });
  return suggestions;
}

async function globalSearch(query = '') {
  const gigs = await searchGigs({ q: query });
  const freelancers = await searchFreelancers({ query });
  const profiles = await matchingEngine.searchProfiles({ search: query });
  const suggestions = Array.from(
    new Set([
      ...collectSuggestions(query, gigs, ['title']),
      ...collectSuggestions(query, freelancers, ['fullName', 'title']),
      ...collectSuggestions(query, profiles, ['fullName', 'location']),
    ])
  ).slice(0, 5);
  return { gigs, freelancers, profiles, suggestions };
}

module.exports = { globalSearch };
