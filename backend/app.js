const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const affiliateRoutes = require('./routes/affiliates');
const financialAnalyticsRoutes = require('./routes/financialAnalytics');
const paymentRoutes = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());

// Mount authentication routes. The parent application may prefix these
// with "/api" when integrating the backend.
app.use('/auth', authRoutes);
app.use('/affiliates', affiliateRoutes);
app.use('/financial-analytics', financialAnalyticsRoutes);
app.use('/agency/:agencyId/payments', paymentRoutes);

const port = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
