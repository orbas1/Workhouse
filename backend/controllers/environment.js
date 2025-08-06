const { setupEnvironment } = require('../services/environment');
const logger = require('../utils/logger');

async function setup(req, res) {
  const { type } = req.body;
  try {
    await setupEnvironment(type);
    res.json({ message: 'Environment setup initiated' });
  } catch (err) {
    logger.error('Environment setup failed', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

module.exports = { setup };
