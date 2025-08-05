const { setFinancials } = require('../models/userFinancial');
const { updateProfile } = require('../models/profile');
const { maskCardNumber } = require('../utils/finance');

function saveFinancialMediaSetup(req, res) {
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
    const financial = setFinancials(userId, { paymentMethod: maskCardNumber(paymentMethod), taxId, vatNumber });
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

module.exports = {
  saveFinancialMediaSetup,
};
