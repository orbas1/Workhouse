const express = require('express');
const auth = require('../middleware/auth');
const { requireFields } = require('../middleware/validate');
const controller = require('../controllers/employee');

const router = express.Router();

// Employee management
router.post('/employees', auth, requireFields('name'), controller.createEmployee);
router.get('/employees', auth, controller.listEmployees);
router.get('/employees/:employeeId', auth, controller.getEmployee);
router.put('/employees/:employeeId', auth, controller.updateEmployee);
router.delete('/employees/:employeeId', auth, controller.deleteEmployee);

// Recruitment and Onboarding
router.post('/recruitment/job-postings', auth, requireFields('title'), controller.createJobPosting);
router.get('/recruitment/job-postings', auth, controller.listJobPostings);
router.post('/recruitment/applications', requireFields('jobId', 'applicantName'), controller.submitApplication);
router.get('/recruitment/applications/:jobId', auth, controller.listApplications);
router.post('/onboarding/:employeeId', auth, controller.initiateOnboarding);

// Leave Management
router.post('/leave-requests', auth, requireFields('employeeId', 'from', 'to', 'reason'), controller.submitLeaveRequest);
router.get('/leave-requests/:employeeId', auth, controller.getLeaveRequests);
router.put('/leave-requests/:requestId', auth, requireFields('status'), controller.updateLeaveRequest);

// Performance Management
router.post('/performance-reviews', auth, requireFields('employeeId', 'reviewer', 'rating'), controller.createPerformanceReview);
router.get('/performance-reviews/:employeeId', auth, controller.getPerformanceReviews);
router.put('/performance-reviews/:reviewId', auth, controller.updatePerformanceReview);

// Training and Development
router.post('/training/sessions', auth, requireFields('topic', 'date'), controller.scheduleTrainingSession);
router.get('/training/sessions', auth, controller.listTrainingSessions);
router.post('/training/attendance/:sessionId', auth, requireFields('employeeId'), controller.recordTrainingAttendance);

// Compensation and Benefits
router.get('/compensation/:employeeId', auth, controller.getCompensation);
router.put('/compensation/:employeeId', auth, requireFields('salary'), controller.updateCompensation);
router.get('/benefits', auth, controller.listBenefits);
router.post('/benefits/enroll', auth, requireFields('employeeId', 'benefitId'), controller.enrollBenefits);

// Employee Relations
router.post('/feedback', auth, requireFields('employeeId', 'message'), controller.submitFeedback);
router.get('/feedback', auth, controller.listFeedback);
router.post('/issues/report', auth, requireFields('employeeId', 'issue'), controller.reportIssue);
router.get('/issues', auth, controller.listIssues);

// Compliance
router.get('/compliance/policies', auth, controller.listPolicies);
router.post('/compliance/acknowledgement', auth, requireFields('employeeId', 'policyId'), controller.acknowledgePolicy);

// HR Analytics and Reporting
router.get('/analytics/turnover', auth, controller.getTurnoverAnalytics);
router.get('/analytics/hiring', auth, controller.getHiringAnalytics);
router.get('/analytics/diversity', auth, controller.getDiversityAnalytics);

// HR Tools and Integrations
router.post('/tools/surveys', auth, requireFields('title'), controller.deploySurvey);
router.get('/tools/survey-results', auth, controller.listSurveyResults);
router.post('/integrations/payroll', auth, requireFields('data'), controller.integratePayroll);

// Employee Self-service
router.get('/self-service/profile', auth, controller.getSelfProfile);
router.put('/self-service/update', auth, controller.updateSelfProfile);
router.get('/self-service/benefits', auth, controller.getSelfBenefits);

// Workplace Safety and Health
router.post('/workplace-safety/report', auth, requireFields('employeeId', 'description'), controller.reportSafetyIncident);
router.get('/workplace-safety/incidents', auth, controller.listSafetyIncidents);
router.post('/workplace-health/screenings', auth, requireFields('employeeId', 'type'), controller.recordHealthScreening);

module.exports = router;
