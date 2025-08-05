function validateLink(req, res, next) {
  const { url, description, materialType } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'url is required and must be a string' });
  }
  if (description && typeof description !== 'string') {
    return res.status(400).json({ error: 'description must be a string' });
  }
  if (materialType && typeof materialType !== 'string') {
    return res.status(400).json({ error: 'materialType must be a string' });
  }
  next();
}

module.exports = validateLink;
