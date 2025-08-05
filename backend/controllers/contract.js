const {
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
  approveSubmittedWork,
  submitInvoiceForContract,
} = require('../services/contract');
const logger = require('../utils/logger');

async function createContractHandler(req, res) {
  try {
    const contract = await createContract(req.body);
    res.status(201).json(contract);
  } catch (err) {
    logger.error('Failed to create contract', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getContractDetailsHandler(req, res) {
  try {
    const contract = await getContractDetails(req.params.contractId);
    res.json(contract);
  } catch (err) {
    logger.error('Failed to get contract details', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function updateContractHandler(req, res) {
  try {
    const contract = await updateContract(req.params.contractId, req.body);
    res.json(contract);
  } catch (err) {
    logger.error('Failed to update contract', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function deleteContractHandler(req, res) {
  try {
    await deleteContract(req.params.contractId);
    res.status(204).send();
  } catch (err) {
    logger.error('Failed to delete contract', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function listContractsHandler(req, res) {
  try {
    const contracts = await listContracts();
    res.json(contracts);
  } catch (err) {
    logger.error('Failed to list contracts', { error: err.message });
    res.status(500).json({ error: 'Unable to list contracts' });
  }
}

async function viewContractProposalsHandler(req, res) {
  try {
    const proposals = await viewContractProposals(req.params.contractId);
    res.json(proposals);
  } catch (err) {
    logger.error('Failed to view contract proposals', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function viewContractInvoicesHandler(req, res) {
  try {
    const invoices = await viewContractInvoices(req.params.contractId);
    res.json(invoices);
  } catch (err) {
    logger.error('Failed to view contract invoices', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function acceptContractProposalHandler(req, res) {
  try {
    const contract = await acceptContractProposal(
      req.params.contractId,
      req.params.proposalId,
    );
    res.json(contract);
  } catch (err) {
    logger.error('Failed to accept contract proposal', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function terminateContractHandler(req, res) {
  try {
    const contract = await terminateContract(req.params.contractId, req.body.reason);
    res.json(contract);
  } catch (err) {
    logger.error('Failed to terminate contract', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function submitWorkForContractHandler(req, res) {
  try {
    const submission = await submitWorkForContract(req.params.contractId, req.body);
    res.status(201).json(submission);
  } catch (err) {
    logger.error('Failed to submit work for contract', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function approveSubmittedWorkHandler(req, res) {
  try {
    const submission = await approveSubmittedWork(
      req.params.contractId,
      req.body.submissionId,
    );
    res.json(submission);
  } catch (err) {
    logger.error('Failed to approve submitted work', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function submitInvoiceForContractHandler(req, res) {
  try {
    const invoice = await submitInvoiceForContract(req.params.contractId, req.body);
    res.status(201).json(invoice);
  } catch (err) {
    logger.error('Failed to submit invoice for contract', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createContractHandler,
  getContractDetailsHandler,
  updateContractHandler,
  deleteContractHandler,
  listContractsHandler,
  viewContractProposalsHandler,
  viewContractInvoicesHandler,
  acceptContractProposalHandler,
  terminateContractHandler,
  submitWorkForContractHandler,
  submitInvoiceForContractHandler,
  approveSubmittedWorkHandler,
};

