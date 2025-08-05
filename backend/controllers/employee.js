const service = require('../services/employee');

// Employee CRUD
async function createEmployee(req, res) {
  try {
    const employee = service.addEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    console.error('Error creating employee', err);
    res.status(400).json({ error: err.message });
  }
}

async function listEmployees(req, res) {
  res.json(service.getAllEmployees());
}

async function getEmployee(req, res) {
  const employee = service.getEmployeeById(req.params.employeeId);
  if (!employee) return res.status(404).json({ error: 'Employee not found' });
  res.json(employee);
}

async function updateEmployee(req, res) {
  const employee = service.updateEmployee(req.params.employeeId, req.body);
  if (!employee) return res.status(404).json({ error: 'Employee not found' });
  res.json(employee);
}

async function deleteEmployee(req, res) {
  const ok = service.deleteEmployee(req.params.employeeId);
  if (!ok) return res.status(404).json({ error: 'Employee not found' });
  res.status(204).end();
}

// Recruitment
async function createJobPosting(req, res) {
  try {
    const job = service.createJobPosting(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job posting', err);
    res.status(400).json({ error: err.message });
  }
}

async function listJobPostings(req, res) {
  res.json(service.listJobPostings());
}

async function submitApplication(req, res) {
  try {
    const app = service.submitApplication(req.body);
    res.status(201).json(app);
  } catch (err) {
    console.error('Error submitting application', err);
    res.status(400).json({ error: err.message });
  }
}

async function listApplications(req, res) {
  res.json(service.listApplicationsByJob(req.params.jobId));
}

async function initiateOnboarding(req, res) {
  const record = service.initiateOnboarding(req.params.employeeId);
  res.status(201).json(record);
}

// Leave Management
async function submitLeaveRequest(req, res) {
  try {
    const request = service.submitLeaveRequest(req.body);
    res.status(201).json(request);
  } catch (err) {
    console.error('Error submitting leave request', err);
    res.status(400).json({ error: err.message });
  }
}

async function getLeaveRequests(req, res) {
  res.json(service.getLeaveRequestsByEmployee(req.params.employeeId));
}

async function updateLeaveRequest(req, res) {
  const request = service.updateLeaveRequest(req.params.requestId, req.body.status);
  if (!request) return res.status(404).json({ error: 'Request not found' });
  res.json(request);
}

// Performance Management
async function createPerformanceReview(req, res) {
  try {
    const review = service.createPerformanceReview(req.body);
    res.status(201).json(review);
  } catch (err) {
    console.error('Error creating performance review', err);
    res.status(400).json({ error: err.message });
  }
}

async function getPerformanceReviews(req, res) {
  res.json(service.getPerformanceReviewsByEmployee(req.params.employeeId));
}

async function updatePerformanceReview(req, res) {
  const review = service.updatePerformanceReview(req.params.reviewId, req.body);
  if (!review) return res.status(404).json({ error: 'Review not found' });
  res.json(review);
}

// Training and Development
async function scheduleTrainingSession(req, res) {
  try {
    const session = service.scheduleTrainingSession(req.body);
    res.status(201).json(session);
  } catch (err) {
    console.error('Error scheduling training session', err);
    res.status(400).json({ error: err.message });
  }
}

async function listTrainingSessions(req, res) {
  res.json(service.listTrainingSessions());
}

async function recordTrainingAttendance(req, res) {
  const record = service.recordTrainingAttendance(req.params.sessionId, req.body.employeeId);
  res.status(201).json(record);
}

// Compensation and Benefits
async function getCompensation(req, res) {
  const comp = service.getCompensation(req.params.employeeId);
  if (!comp) return res.status(404).json({ error: 'Compensation not found' });
  res.json(comp);
}

async function updateCompensation(req, res) {
  const comp = service.updateCompensation(req.params.employeeId, req.body);
  res.json(comp);
}

async function listBenefits(req, res) {
  res.json(service.listBenefits());
}

async function enrollBenefits(req, res) {
  const enrollment = service.enrollBenefits(req.body.employeeId, req.body.benefitId);
  res.status(201).json(enrollment);
}

// Employee Relations
async function submitFeedback(req, res) {
  const feedback = service.submitFeedback(req.body);
  res.status(201).json(feedback);
}

async function listFeedback(req, res) {
  res.json(service.listFeedback());
}

async function reportIssue(req, res) {
  const issue = service.reportIssue(req.body);
  res.status(201).json(issue);
}

async function listIssues(req, res) {
  res.json(service.listIssues());
}

// Compliance
async function listPolicies(req, res) {
  res.json(service.listPolicies());
}

async function acknowledgePolicy(req, res) {
  const ack = service.acknowledgePolicy(req.body.employeeId, req.body.policyId);
  res.status(201).json(ack);
}

// Analytics
async function getTurnoverAnalytics(req, res) {
  res.json(service.getTurnoverAnalytics());
}

async function getHiringAnalytics(req, res) {
  res.json(service.getHiringAnalytics());
}

async function getDiversityAnalytics(req, res) {
  res.json(service.getDiversityAnalytics());
}

// HR Tools and Integrations
async function deploySurvey(req, res) {
  const survey = service.deploySurvey(req.body);
  res.status(201).json(survey);
}

async function listSurveyResults(req, res) {
  res.json(service.listSurveyResults());
}

async function integratePayroll(req, res) {
  const result = service.integratePayroll(req.body);
  res.status(201).json(result);
}

// Self Service
async function getSelfProfile(req, res) {
  const profile = service.getSelfProfile(req.user.username);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
}

async function updateSelfProfile(req, res) {
  const profile = service.updateSelfProfile(req.user.username, req.body);
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
}

async function getSelfBenefits(req, res) {
  res.json(service.getSelfBenefits(req.user.username));
}

// Workplace Safety and Health
async function reportSafetyIncident(req, res) {
  const report = service.reportSafetyIncident(req.body);
  res.status(201).json(report);
}

async function listSafetyIncidents(req, res) {
  res.json(service.listSafetyIncidents());
}

async function recordHealthScreening(req, res) {
  const record = service.recordHealthScreening(req.body);
  res.status(201).json(record);
}

module.exports = {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  createJobPosting,
  listJobPostings,
  submitApplication,
  listApplications,
  initiateOnboarding,
  submitLeaveRequest,
  getLeaveRequests,
  updateLeaveRequest,
  createPerformanceReview,
  getPerformanceReviews,
  updatePerformanceReview,
  scheduleTrainingSession,
  listTrainingSessions,
  recordTrainingAttendance,
  getCompensation,
  updateCompensation,
  listBenefits,
  enrollBenefits,
  submitFeedback,
  listFeedback,
  reportIssue,
  listIssues,
  listPolicies,
  acknowledgePolicy,
  getTurnoverAnalytics,
  getHiringAnalytics,
  getDiversityAnalytics,
  deploySurvey,
  listSurveyResults,
  integratePayroll,
  getSelfProfile,
  updateSelfProfile,
  getSelfBenefits,
  reportSafetyIncident,
  listSafetyIncidents,
  recordHealthScreening
};
