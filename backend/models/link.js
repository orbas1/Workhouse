const links = [];

function createLink(link) {
  links.push(link);
  return link;
}

function getLinksByAffiliate(affiliateId) {
  return links.filter(l => l.affiliateId === affiliateId);
}

module.exports = { createLink, getLinksByAffiliate };
