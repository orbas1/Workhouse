const info = (message, meta = {}) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta);
};

const error = (message, meta = {}) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta);
};

module.exports = { info, error };
