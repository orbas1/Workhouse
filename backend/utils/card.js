const axios = require('axios');

async function getCardBrand(cardNumber) {
  try {
    const bin = String(cardNumber).replace(/\D/g, '').slice(0, 6);
    if (!bin) return null;
    const base = process.env.BINLIST_API || 'https://lookup.binlist.net';
    const url = `${base}/${bin}`;
    const res = await axios.get(url);
    return res.data.scheme || null;
  } catch (err) {
    return null;
  }
}

module.exports = { getCardBrand };
