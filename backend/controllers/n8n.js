const { setupN8n } = require('../services/n8nSetup');

async function setupN8nHandler(req, res) {
  const { host, username, key, port, n8nPort } = req.body;
  try {
    await setupN8n({ host, username, key, port, n8nPort });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { setupN8nHandler };
