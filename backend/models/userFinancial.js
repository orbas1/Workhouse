const financials = new Map();

function setFinancials(userId, { paymentMethod, cardBrand = null, taxId = null, vatNumber = null }) {
  const record = {
    paymentMethod,
    cardBrand,
    taxId,
    vatNumber,
    updatedAt: new Date(),
  };
  financials.set(userId, record);
  return record;
}

function getFinancials(userId) {
  return financials.get(userId) || null;
}

module.exports = {
  setFinancials,
  getFinancials,
};
