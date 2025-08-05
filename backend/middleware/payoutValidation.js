const allowedStatuses = ['pending', 'processed', 'failed'];

function validateInitiatePayout(req, res, next) {
  const { amount } = req.body;
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    console.warn('Validation error: Invalid amount', { amount });
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }
  next();
}

function validateStatusUpdate(req, res, next) {
  const { status } = req.body;
  if (!allowedStatuses.includes(status)) {
    console.warn('Validation error: Invalid status', { status });
    return res.status(400).json({ error: `Status must be one of: ${allowedStatuses.join(', ')}` });
  }
  next();
}

module.exports = {
  validateInitiatePayout,
  validateStatusUpdate,
  allowedStatuses,
};
