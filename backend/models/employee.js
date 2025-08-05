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
