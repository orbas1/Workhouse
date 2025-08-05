function ensureSelfOrAdmin(req, res, next) {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  if (req.user?.role !== 'admin' && req.user?.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

module.exports = { ensureSelfOrAdmin };

