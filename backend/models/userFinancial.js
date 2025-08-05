const financials = new Map();

function setFinancials(userId, { paymentMethod, taxId = null, vatNumber = null }) {
  const record = {
    paymentMethod,
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
