const axios = require('axios');

async function getCardBrand(cardNumber) {
  try {
    const bin = String(cardNumber).replace(/\D/g, '').slice(0, 6);
    if (!bin) return null;
    const base =
      process.env.BINLIST_API ||
      (process.env.API_BASE_URL
        ? `${process.env.API_BASE_URL}/payments/bin`
        : '');
    if (!base) return null;
    const url = `${base}/${bin}`;
    const res = await axios.get(url);
    return res.data.scheme || null;
  } catch (err) {
    return null;
  }
}

module.exports = { getCardBrand };
