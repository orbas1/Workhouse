function maskCardNumber(num) {
  if (!num) return '';
  const str = String(num).replace(/\D/g, '');
  const last4 = str.slice(-4);
  return last4.padStart(str.length, '*');
}

module.exports = {
  maskCardNumber,
};
