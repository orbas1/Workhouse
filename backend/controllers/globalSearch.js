const { globalSearch } = require('../services/globalSearch');

async function globalSearchHandler(req, res) {
  try {
    const { q = '' } = req.query;
    const results = await globalSearch(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to perform global search' });
  }
}

module.exports = { globalSearchHandler };
