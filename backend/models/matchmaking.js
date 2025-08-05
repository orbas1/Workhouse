const { randomUUID } = require('crypto');

const jobs = [];
const employees = [];
const criteriaMap = new Map();
const matches = [];

function addJob(job) {
  const jobRecord = { id: randomUUID(), status: 'open', ...job };
  jobs.push(jobRecord);
  return jobRecord;
}

function addEmployee(employee) {
  const employeeRecord = { id: randomUUID(), availability: true, pastPerformance: 0, ...employee };
  employees.push(employeeRecord);
  return employeeRecord;
}

function getJobsByAgency(agencyId) {
  return jobs.filter((job) => job.agencyId === agencyId && job.status !== 'closed');
}

function getEmployeesByAgency(agencyId) {
  return employees.filter((emp) => emp.agencyId === agencyId);
}

function getCriteria(agencyId) {
  return (
    criteriaMap.get(agencyId) || {
      skillsWeight: 0.5,
      availabilityWeight: 0.3,
      performanceWeight: 0.2,
    }
  );
}

function setCriteria(agencyId, criteria) {
  const current = getCriteria(agencyId);
  const updated = { ...current, ...criteria };
  criteriaMap.set(agencyId, updated);
  return updated;
}

function saveMatch({ agencyId, jobId, employeeId, matchScore }) {
  const match = {
    id: randomUUID(),
    agencyId,
    jobId,
    employeeId,
    matchScore,
    matchedAt: new Date(),
  };
  matches.push(match);
  return match;
}

module.exports = {
  addJob,
  addEmployee,
  getJobsByAgency,
  getEmployeesByAgency,
  getCriteria,
  setCriteria,
  saveMatch,
};
