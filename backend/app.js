const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const commissionRoutes = require('./routes/commission');
const payoutRoutes = require('./routes/payouts');
const linkRoutes = require('./routes/link');
const referralRoutes = require('./routes/referrals');
const onboardingRoutes = require('./routes/onboarding');
const notificationRoutes = require('./routes/notification');
const agencyRoutes = require('./routes/agency');
const employeeRoutes = require('./routes/employee');
const affiliateRoutes = require('./routes/affiliates');
const jobRoutes = require('./routes/jobs');
const analyticsRoutes = require('./routes/analytics');
const matchmakingRoutes = require('./routes/matchmaking');
const contractRoutes = require('./routes/contracts');
const clientRoutes = require('./routes/clients');
const securityRoutes = require('./routes/security');
const feedbackRoutes = require('./routes/feedback');
const financialRoutes = require('./routes/financial');
const financialTransactionRoutes = require('./routes/financialTransactions');
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
const employmentAnalyticsRoutes = require('./routes/employmentAnalytics');
const communicationRoutes = require('./routes/communicationTools');
const goalRoutes = require('./routes/goals');
const milestoneRoutes = require('./routes/milestones');
const progressRoutes = require('./routes/progress');
const achievementRoutes = require('./routes/achievements');
const skillRoutes = require('./routes/skills');

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes. The parent application may prefix these with "/api"
// when integrating the backend.
app.use('/auth', authRoutes);
app.use('/affiliates', dashboardRoutes);
app.use('/commissions', commissionRoutes);
app.use('/payouts', payoutRoutes);
app.use('/affiliates', linkRoutes);
app.use('/referrals', referralRoutes);
app.use('/affiliates', onboardingRoutes);
app.use('/agency', agencyRoutes);
app.use('/hr', employeeRoutes);
app.use('/affiliates', affiliateRoutes);
app.use('/agency/jobs', jobRoutes);
app.use('/agency', jobRoutes);
app.use('/agency', analyticsRoutes);
app.use('/agency', matchmakingRoutes);
app.use('/contracts', contractRoutes);
app.use('/agency', clientRoutes);
app.use('/security', securityRoutes);
app.use('/agency', feedbackRoutes);
app.use('/agency', financialRoutes);
app.use('/financial', financialTransactionRoutes);
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
app.use('/analytics/employment', employmentAnalyticsRoutes);
app.use('/communication', communicationRoutes);
app.use('/progress', progressRoutes);
app.use('/achievements', achievementRoutes);
app.use('/skills', skillRoutes);
app.use('/goals', goalRoutes);
app.use('/milestones', milestoneRoutes);

// Commission rate adjustment notifications
app.use('/affiliates/notifications', notificationRoutes);

const port = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
