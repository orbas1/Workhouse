const { getAnalytics } = require('../models/startupAnalytics');

exports.getEngagement = (req, res) => {
  const userId = req.user && req.user.id ? req.user.id : 1;
  const data = getAnalytics(userId);
  res.json(data);
};
