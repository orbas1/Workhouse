const { fetchRandomQuote } = require('../services/quotes');

async function getRandomQuoteHandler(req, res) {
  try {
    const quote = await fetchRandomQuote();
    res.json(quote);
  } catch (err) {
    console.error('Quote fetch failed', err);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
}

module.exports = { getRandomQuoteHandler };
