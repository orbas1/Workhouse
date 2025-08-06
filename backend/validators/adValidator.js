function validateAd(data) {
  if (!data || typeof data !== 'object') {
    return 'Invalid payload';
  }
  const required = ['title', 'content'];
  for (const field of required) {
    if (!data[field] || typeof data[field] !== 'string') {
      return `${field} is required`;
    }
  }
  if (data.targetUrl && typeof data.targetUrl !== 'string') {
    return 'targetUrl must be a string';
  }
  if (data.imageUrl && typeof data.imageUrl !== 'string') {
    return 'imageUrl must be a string';
  }
  return null;
}

module.exports = { validateAd };
