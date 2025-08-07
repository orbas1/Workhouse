const fs = require('fs');
const path = require('path');

const INSTALL_PATH = path.join(__dirname, '../data/install.json');

function readInstallFile() {
  try {
    const raw = fs.readFileSync(INSTALL_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { installed: false };
  }
}

function writeInstallFile(data) {
  fs.writeFileSync(INSTALL_PATH, JSON.stringify(data, null, 2));
}

function getStatus() {
  return readInstallFile();
}

function saveInstallation({ appId, appUrl, dbConfig, site }) {
  const record = {
    installed: true,
    appId,
    appUrl,
    dbConfig,
    site,
    installedAt: new Date().toISOString(),
  };
  writeInstallFile(record);
  return record;
}

module.exports = { getStatus, saveInstallation };
