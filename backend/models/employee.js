// In-memory data stores for HR/employee management module.
// These simulate database tables for demonstration and testing purposes.

const employees = [];
const jobPostings = [];
const applications = [];
const onboardingRecords = [];
const leaveRequests = [];
const performanceReviews = [];
const trainingSessions = [];
const trainingAttendance = [];
const compensationRecords = [];
const benefitsCatalog = [
  { id: 1, name: 'Health Insurance' },
  { id: 2, name: 'Retirement Plan' }
];
const employeeBenefits = [];
const feedbacks = [];
const issues = [];
const policies = [
  { id: 1, title: 'Code of Conduct' },
  { id: 2, title: 'Privacy Policy' }
];
const policyAcknowledgements = [];
const surveys = [];
const surveyResults = [];
const payrollIntegrations = [];
const safetyReports = [];
const healthScreenings = [];

module.exports = {
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
const { randomUUID } = require('crypto');

const employees = new Map();

function createEmployee({ name, email }) {
  const id = randomUUID();
  const employee = {
    id,
    name,
    email,
    status: 'active',
    createdAt: new Date(),
  };
  employees.set(id, employee);
  return employee;
}

function findById(id) {
  return employees.get(id);
}

module.exports = {
  createEmployee,
  findById,
};
