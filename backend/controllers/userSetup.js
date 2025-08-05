const { setFinancials, getFinancials } = require('../models/userFinancial');
const { updateProfile, findByUserId } = require('../models/profile');
const { maskCardNumber } = require('../utils/finance');
const { getCardBrand } = require('../utils/card');

async function saveFinancialMediaSetup(req, res) {
  const { userId } = req.params;
  const {
    paymentMethod,
    taxId,
    vatNumber,
    profilePicture,
    bio,
    introVideo,
    portfolioLinks = [],
    title,
  } = req.body;
  try {
    const cardBrand = await getCardBrand(paymentMethod);
    const financial = setFinancials(userId, {
      paymentMethod: maskCardNumber(paymentMethod),
      cardBrand,
      taxId,
      vatNumber,
    });
    const profile = updateProfile(userId, {
      bio,
      profilePicture,
      introVideo,
      portfolioLinks,
      title,
    });
    return res.json({ financial, profile });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

function getFinancialMediaSetup(req, res) {
  const { userId } = req.params;
  try {
    const financial = getFinancials(userId);
    const profile = findByUserId(userId);
    if (!financial && !profile) {
      return res.status(404).json({ error: 'Setup not found' });
    }
    return res.json({ financial, profile });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  saveFinancialMediaSetup,
  getFinancialMediaSetup,
};
