const express = require('express');
const {
  createContractHandler,
  getContractDetailsHandler,
  updateContractHandler,
  deleteContractHandler,
  listContractsHandler,
  viewContractProposalsHandler,
  acceptContractProposalHandler,
  terminateContractHandler,
  submitWorkForContractHandler,
  approveSubmittedWorkHandler,
} = require('../controllers/contract');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createContractSchema,
  updateContractSchema,
  submitWorkSchema,
  approveWorkSchema,
  terminateContractSchema,
} = require('../validation/contract');

const router = express.Router();

router.post('/create', auth, validate(createContractSchema), createContractHandler);
router.get('/:contractId', auth, getContractDetailsHandler);
router.put('/:contractId', auth, validate(updateContractSchema), updateContractHandler);
router.delete('/:contractId', auth, deleteContractHandler);
router.get('/', auth, listContractsHandler);
router.get('/:contractId/proposals', auth, viewContractProposalsHandler);
router.post('/:contractId/proposals/:proposalId/accept', auth, acceptContractProposalHandler);
router.put('/:contractId/terminate', auth, validate(terminateContractSchema), terminateContractHandler);
router.post('/:contractId/work/submit', auth, validate(submitWorkSchema), submitWorkForContractHandler);
router.put('/:contractId/work/approve', auth, validate(approveWorkSchema), approveSubmittedWorkHandler);

module.exports = router;

