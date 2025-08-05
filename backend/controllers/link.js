const { listAffiliateLinks, createAffiliateLink } = require('../services/link');

async function getLinks(req, res) {
  const { affiliateId } = req.params;
  if (req.user.username !== affiliateId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const links = listAffiliateLinks(affiliateId);
    res.json(links);
  } catch (err) {
    console.error('Error retrieving links', err);
    res.status(500).json({ error: 'Failed to retrieve links' });
  }
}

async function createLink(req, res) {
  const { affiliateId } = req.params;
  if (req.user.username !== affiliateId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { url, description, materialType } = req.body;
  try {
    const link = createAffiliateLink(affiliateId, url, description, materialType);
    console.info(`Affiliate ${affiliateId} created link ${link.id}`);
    res.status(201).json(link);
  } catch (err) {
    console.error('Error creating link', err);
    res.status(500).json({ error: 'Failed to create link' });
  }
}

module.exports = { getLinks, createLink };
