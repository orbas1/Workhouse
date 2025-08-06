const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const rootDir = path.resolve(__dirname, '..');
const envFiles = ['.env', '.env.example'].map(file => path.join(rootDir, file));

for (const file of envFiles) {
  if (fs.existsSync(file)) {
    dotenv.config({ path: file });
    break;
  }
}
