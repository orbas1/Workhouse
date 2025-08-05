const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const affiliateRoutes = require('./routes/affiliates');
const feedbackRoutes = require('./routes/feedback');
const financialRoutes = require('./routes/financial');
const trainingRoutes = require('./routes/training');
const dataProtectionRoutes = require('./routes/dataProtection');
const analyticsRoutes = require('./routes/analytics');
const agencyAnalyticsRoutes = require('./routes/agencyAnalytics');
const aiAnalyticsRoutes = require('./routes/aiAnalytics');
const classroomAnalyticsRoutes = require('./routes/classroomAnalytics');
const disputeAnalyticsRoutes = require('./routes/disputeAnalytics');
const educationAnalyticsRoutes = require('./routes/educationAnalytics');
const financialAnalyticsRoutes = require('./routes/financialAnalytics');
const paymentRoutes = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());

// Mount authentication routes. The parent application may prefix these
// with "/api" when integrating the backend.
app.use('/auth', authRoutes);
app.use('/affiliates', affiliateRoutes);
app.use('/agency', feedbackRoutes);
app.use('/agency', financialRoutes);
app.use('/hr/training', trainingRoutes);
app.use('/security/data', dataProtectionRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/analytics', agencyAnalyticsRoutes);
app.use('/ai-analytics', aiAnalyticsRoutes);
app.use('/classroom-analytics', classroomAnalyticsRoutes);
app.use('/analytics/disputes', disputeAnalyticsRoutes);
app.use('/education-analytics', educationAnalyticsRoutes);
app.use('/financial-analytics', financialAnalyticsRoutes);
app.use('/agency/:agencyId/payments', paymentRoutes);

const port = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
