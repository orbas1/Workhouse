const axios = require('axios');

async function fetchRandomQuote() {
  const url = process.env.EXTERNAL_QUOTE_API;
  const res = await axios.get(url);
  return { content: res.data.content, author: res.data.author };
}

module.exports = { fetchRandomQuote };
