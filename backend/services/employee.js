const {
  employees,
  jobPostings,
  applications,
  onboardingRecords,
  leaveRequests,
  performanceReviews,
  trainingSessions,
  trainingAttendance,
  compensationRecords,
  benefitsCatalog,
  employeeBenefits,
  feedbacks,
  issues,
  policies,
  policyAcknowledgements,
  surveys,
  surveyResults,
  payrollIntegrations,
  safetyReports,
  healthScreenings
} = require('../models/employee');

let employeeIdSeq = 1;
let jobIdSeq = 1;
let applicationIdSeq = 1;
let onboardingIdSeq = 1;
let leaveRequestIdSeq = 1;
let reviewIdSeq = 1;
let trainingSessionIdSeq = 1;
let feedbackIdSeq = 1;
let issueIdSeq = 1;
let surveyIdSeq = 1;
let safetyReportIdSeq = 1;
let healthScreeningIdSeq = 1;

// Employee CRUD
function addEmployee(data) {
  const employee = { id: employeeIdSeq++, ...data };
  employees.push(employee);
  return employee;
}

function getAllEmployees() {
  return employees;
}

function getEmployeeById(id) {
  return employees.find(e => e.id === Number(id));
}

function updateEmployee(id, data) {
  const employee = getEmployeeById(id);
  if (!employee) return null;
  Object.assign(employee, data);
  return employee;
}

function deleteEmployee(id) {
  const idx = employees.findIndex(e => e.id === Number(id));
  if (idx === -1) return false;
  employees.splice(idx, 1);
  return true;
}

// Recruitment
function createJobPosting(data) {
  const job = { id: jobIdSeq++, ...data };
  jobPostings.push(job);
  return job;
}

function listJobPostings() {
  return jobPostings;
}

function submitApplication(data) {
  const application = { id: applicationIdSeq++, ...data };
  applications.push(application);
  return application;
}

function listApplicationsByJob(jobId) {
  return applications.filter(a => a.jobId === Number(jobId));
}

function initiateOnboarding(employeeId) {
  const record = { id: onboardingIdSeq++, employeeId: Number(employeeId), startedAt: new Date().toISOString() };
  onboardingRecords.push(record);
  return record;
}

// Leave Management
function submitLeaveRequest(data) {
  const request = { id: leaveRequestIdSeq++, status: 'pending', ...data };
  leaveRequests.push(request);
  return request;
}

function getLeaveRequestsByEmployee(employeeId) {
  return leaveRequests.filter(r => r.employeeId === Number(employeeId));
}

function updateLeaveRequest(requestId, status) {
  const request = leaveRequests.find(r => r.id === Number(requestId));
  if (!request) return null;
  request.status = status;
  return request;
}

// Performance Management
function createPerformanceReview(data) {
  const review = { id: reviewIdSeq++, ...data };
  performanceReviews.push(review);
  return review;
}

function getPerformanceReviewsByEmployee(employeeId) {
  return performanceReviews.filter(r => r.employeeId === Number(employeeId));
}

function updatePerformanceReview(reviewId, data) {
  const review = performanceReviews.find(r => r.id === Number(reviewId));
  if (!review) return null;
  Object.assign(review, data);
  return review;
}

// Training and Development
function scheduleTrainingSession(data) {
  const session = { id: trainingSessionIdSeq++, ...data };
  trainingSessions.push(session);
  return session;
}

function listTrainingSessions() {
  return trainingSessions;
}

function recordTrainingAttendance(sessionId, employeeId) {
  const record = { sessionId: Number(sessionId), employeeId: Number(employeeId) };
  trainingAttendance.push(record);
  return record;
}

// Compensation and Benefits
function getCompensation(employeeId) {
  return compensationRecords.find(c => c.employeeId === Number(employeeId));
}

function updateCompensation(employeeId, data) {
  let record = getCompensation(employeeId);
  if (!record) {
    record = { employeeId: Number(employeeId), ...data };
    compensationRecords.push(record);
  } else {
    Object.assign(record, data);
  }
  return record;
}

function listBenefits() {
  return benefitsCatalog;
}

function enrollBenefits(employeeId, benefitId) {
  const enrollment = { employeeId: Number(employeeId), benefitId: Number(benefitId) };
  employeeBenefits.push(enrollment);
  return enrollment;
}

function getEmployeeBenefits(employeeId) {
  const ids = employeeBenefits.filter(b => b.employeeId === Number(employeeId)).map(b => b.benefitId);
  return benefitsCatalog.filter(b => ids.includes(b.id));
}

// Employee Relations
function submitFeedback(data) {
  const feedback = { id: feedbackIdSeq++, ...data };
  feedbacks.push(feedback);
  return feedback;
}

function listFeedback() {
  return feedbacks;
}

function reportIssue(data) {
  const issue = { id: issueIdSeq++, ...data };
  issues.push(issue);
  return issue;
}

function listIssues() {
  return issues;
}

// Compliance
function listPolicies() {
  return policies;
}

function acknowledgePolicy(employeeId, policyId) {
  const acknowledgement = {
    employeeId: Number(employeeId),
    policyId: Number(policyId),
    acknowledgedAt: new Date().toISOString()
  };
  policyAcknowledgements.push(acknowledgement);
  return acknowledgement;
}

// Analytics
function getTurnoverAnalytics() {
  return { totalEmployees: employees.length, turnoverRate: 0 };
}

function getHiringAnalytics() {
  return { jobPostings: jobPostings.length, applications: applications.length };
}

function getDiversityAnalytics() {
  return { diversityIndex: null };
}

// HR Tools and Integrations
function deploySurvey(data) {
  const survey = { id: surveyIdSeq++, ...data };
  surveys.push(survey);
  return survey;
}

function listSurveyResults() {
  return surveyResults;
}

function integratePayroll(data) {
  payrollIntegrations.push(data);
  return { status: 'integrated' };
}

// Self Service
function getSelfProfile(username) {
  return employees.find(e => e.username === username);
}

function updateSelfProfile(username, data) {
  const employee = getSelfProfile(username);
  if (!employee) return null;
  Object.assign(employee, data);
  return employee;
}

function getSelfBenefits(username) {
  const employee = getSelfProfile(username);
  if (!employee) return [];
  return getEmployeeBenefits(employee.id);
}

// Workplace Safety and Health
function reportSafetyIncident(data) {
  const report = { id: safetyReportIdSeq++, ...data };
  safetyReports.push(report);
  return report;
}

function listSafetyIncidents() {
  return safetyReports;
}

function recordHealthScreening(data) {
  const screening = { id: healthScreeningIdSeq++, ...data };
  healthScreenings.push(screening);
  return screening;
}

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  createJobPosting,
  listJobPostings,
  submitApplication,
  listApplicationsByJob,
  initiateOnboarding,
  submitLeaveRequest,
  getLeaveRequestsByEmployee,
  updateLeaveRequest,
  createPerformanceReview,
  getPerformanceReviewsByEmployee,
  updatePerformanceReview,
  scheduleTrainingSession,
  listTrainingSessions,
  recordTrainingAttendance,
  getCompensation,
  updateCompensation,
  listBenefits,
  enrollBenefits,
  getEmployeeBenefits,
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
