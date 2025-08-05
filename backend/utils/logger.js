const logger = {
  info: (message, ...args) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
  },
  error: (message, ...args) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
  },
};

module.exports = logger;
const info = (message, meta = {}) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta);
};

const error = (message, meta = {}) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta);
};

module.exports = { info, error };
