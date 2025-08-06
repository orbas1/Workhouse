const logger = require('../utils/logger');
const contractModel = require('../models/contract');

async function createContract(data) {
  const contract = contractModel.createContract(data);
  logger.info('Contract created', { contractId: contract.id, clientId: contract.clientId });
  return contract;
}

async function getContractDetails(id) {
  const contract = contractModel.findById(id);
  if (!contract) {
    throw new Error('Contract not found');
  }
  return contract;
}

async function updateContract(id, updates) {
  const contract = contractModel.updateContract(id, updates);
  if (!contract) {
    throw new Error('Contract not found or cannot be updated');
  }
  logger.info('Contract updated', { contractId: id });
  return contract;
}

async function deleteContract(id) {
  const deleted = contractModel.deleteContract(id);
  if (!deleted) {
    throw new Error('Contract not found');
  }
  logger.info('Contract deleted', { contractId: id });
}

async function listContracts() {
  return contractModel.listAll();
}

async function viewContractProposals(contractId) {
  const contract = contractModel.findById(contractId);
  if (!contract) {
    throw new Error('Contract not found');
  }
  return contractModel.getProposals(contractId);
}

async function viewContractInvoices(contractId) {
  const contract = contractModel.findById(contractId);
  if (!contract) {
    throw new Error('Contract not found');
  }
  return contractModel.getInvoices(contractId);
}

async function viewWorkSubmissions(contractId) {
  const contract = contractModel.findById(contractId);
  if (!contract) {
    throw new Error('Contract not found');
  }
  return contractModel.getWorkSubmissions(contractId);
}

async function acceptContractProposal(contractId, proposalId) {
  const proposal = contractModel.acceptProposal(contractId, proposalId);
  if (!proposal) {
    throw new Error('Proposal not found');
  }
  logger.info('Contract proposal accepted', { contractId, proposalId });
  return contractModel.findById(contractId);
}

async function terminateContract(contractId, reason) {
  const contract = contractModel.terminateContract(contractId, reason);
  if (!contract) {
    throw new Error('Contract not found');
  }
  logger.info('Contract terminated', { contractId, reason });
  return contract;
}

async function submitWorkForContract(contractId, submission) {
  const contract = contractModel.findById(contractId);
  if (!contract) {
    throw new Error('Contract not found');
  }
  if (contract.status !== 'active') {
    throw new Error('Contract is not active');
  }
  if (contract.freelancerId !== submission.freelancerId) {
    throw new Error('Freelancer not authorized for this contract');
  }
  const record = contractModel.submitWork(contractId, submission);
  if (!record) {
    throw new Error('Unable to submit work');
  }
  logger.info('Work submitted for contract', { contractId, submissionId: record.id });
  return record;
}

async function submitInvoiceForContract(contractId, invoice) {
  const contract = contractModel.findById(contractId);
  if (!contract) {
    throw new Error('Contract not found');
  }
  if (contract.freelancerId !== invoice.freelancerId) {
    throw new Error('Freelancer not authorized for this contract');
  }
  const record = contractModel.addInvoice(contractId, invoice);
  if (!record) {
    throw new Error('Unable to submit invoice');
  }
  logger.info('Invoice submitted for contract', { contractId, invoiceId: record.id });
  return record;
}

async function approveSubmittedWork(contractId, submissionId) {
  const submission = contractModel.approveWork(contractId, submissionId);
  if (!submission) {
    throw new Error('Submission not found');
  }
  logger.info('Work approved for contract', { contractId, submissionId });
  return submission;
}

module.exports = {
  createContract,
  getContractDetails,
  updateContract,
  deleteContract,
  listContracts,
  viewContractProposals,
  viewContractInvoices,
  acceptContractProposal,
  terminateContract,
  submitWorkForContract,
  submitInvoiceForContract,
  approveSubmittedWork,
  viewWorkSubmissions,
};

