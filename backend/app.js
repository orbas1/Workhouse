const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const affiliateRoutes = require('./routes/affiliates');
const jobRoutes = require('./routes/jobs');

const app = express();
app.use(cors());
app.use(express.json());

// Mount authentication routes. The parent application may prefix these
// with "/api" when integrating the backend.
app.use('/auth', authRoutes);
app.use('/affiliates', affiliateRoutes);
app.use('/agency/jobs', jobRoutes);

const port = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
