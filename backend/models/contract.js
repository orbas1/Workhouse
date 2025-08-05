const { randomUUID } = require('crypto');

const contracts = new Map();
const contractProposals = new Map();
const workSubmissions = new Map();
const contractInvoices = new Map();

function createContract({
  clientId,
  title,
  description,
  paymentType,
  budget,
  hourlyRate,
  expectedHours,
  milestones = [],
  deliverables = [],
  timeline,
}) {
  const id = randomUUID();
  const timestamp = new Date();
  const mappedMilestones = milestones.map((m) => ({
    id: randomUUID(),
    title: m.title,
    dueDate: m.dueDate ? new Date(m.dueDate) : null,
    amount: m.amount ?? null,
  }));
  const mappedDeliverables = deliverables.map((d) => ({
    id: randomUUID(),
    description: d.description,
  }));
  const contract = {
    id,
    clientId,
    freelancerId: null,
    title,
    description: description || null,
    paymentType: paymentType || 'fixed',
    budget: budget ?? null,
    hourlyRate: hourlyRate ?? null,
    expectedHours: expectedHours ?? null,
    milestones: mappedMilestones,
    deliverables: mappedDeliverables,
    timeline: timeline || null,
    status: 'open',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  contracts.set(id, contract);
  contractProposals.set(id, []);
  workSubmissions.set(id, []);
  contractInvoices.set(id, []);
  return contract;
}

function findById(id) {
  return contracts.get(id);
}

function updateContract(id, updates) {
  const contract = contracts.get(id);
  if (!contract || ['terminated', 'completed'].includes(contract.status)) {
    return null;
  }
  if (updates.milestones) {
    updates.milestones = updates.milestones.map((m) => ({
      id: m.id || randomUUID(),
      title: m.title,
      dueDate: m.dueDate ? new Date(m.dueDate) : null,
      amount: m.amount ?? null,
    }));
  }
  if (updates.deliverables) {
    updates.deliverables = updates.deliverables.map((d) => ({
      id: d.id || randomUUID(),
      description: d.description,
    }));
  }
  Object.assign(contract, updates, { updatedAt: new Date() });
  contracts.set(id, contract);
  return contract;
}

function deleteContract(id) {
  const exists = contracts.has(id);
  if (!exists) return false;
  contracts.delete(id);
  contractProposals.delete(id);
  workSubmissions.delete(id);
  return true;
}

function listAll() {
  return Array.from(contracts.values());
}

function getByClient(clientId) {
  return listAll().filter((c) => c.clientId === clientId);
}

function getProposals(contractId) {
  return contractProposals.get(contractId) || [];
}

function getInvoices(contractId) {
  return contractInvoices.get(contractId) || [];
}

function addProposal(contractId, { freelancerId, proposalText }) {
  const proposals = contractProposals.get(contractId);
  if (!proposals) return null;
  const proposal = {
    id: randomUUID(),
    contractId,
    freelancerId,
    proposalText: proposalText || null,
    status: 'pending',
    createdAt: new Date(),
  };
  proposals.push(proposal);
  return proposal;
}

function acceptProposal(contractId, proposalId) {
  const proposals = contractProposals.get(contractId);
  if (!proposals) return null;
  const proposal = proposals.find((p) => p.id === proposalId);
  if (!proposal) return null;
  proposals.forEach((p) => {
    p.status = p.id === proposalId ? 'accepted' : 'rejected';
  });
  const contract = contracts.get(contractId);
  if (!contract) return null;
  contract.freelancerId = proposal.freelancerId;
  contract.status = 'active';
  contract.updatedAt = new Date();
  contracts.set(contractId, contract);
  return proposal;
}

function terminateContract(id, reason) {
  const contract = contracts.get(id);
  if (!contract) return null;
  contract.status = 'terminated';
  contract.terminationReason = reason;
  contract.updatedAt = new Date();
  contracts.set(id, contract);
  return contract;
}

function submitWork(contractId, { freelancerId, workUrl, notes }) {
  const submissions = workSubmissions.get(contractId);
  if (!submissions) return null;
  const submission = {
    id: randomUUID(),
    contractId,
    freelancerId,
    workUrl,
    notes: notes || null,
    status: 'submitted',
    submittedAt: new Date(),
    approvedAt: null,
  };
  submissions.push(submission);
  return submission;
}

function addInvoice(contractId, { freelancerId, amount, description }) {
  const invoices = contractInvoices.get(contractId);
  if (!invoices) return null;
  const invoice = {
    id: randomUUID(),
    contractId,
    freelancerId,
    amount,
    description: description || null,
    status: 'pending',
    createdAt: new Date(),
  };
  invoices.push(invoice);
  return invoice;
}

function approveWork(contractId, submissionId) {
  const submissions = workSubmissions.get(contractId);
  if (!submissions) return null;
  const submission = submissions.find((s) => s.id === submissionId);
  if (!submission) return null;
  submission.status = 'approved';
  submission.approvedAt = new Date();
  const contract = contracts.get(contractId);
  if (contract) {
    contract.status = 'completed';
    contract.updatedAt = new Date();
    contracts.set(contractId, contract);
  }
  return submission;
}

module.exports = {
  createContract,
  findById,
  updateContract,
  deleteContract,
  listAll,
  getByClient,
  getProposals,
  getInvoices,
  addProposal,
  addInvoice,
  acceptProposal,
  terminateContract,
  submitWork,
  approveWork,
};

