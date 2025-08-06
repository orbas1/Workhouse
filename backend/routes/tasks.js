const express = require('express');
const ctrl = require('../controllers/taskMarketplace');

const router = express.Router();

router.post('/', ctrl.createTask);
router.get('/', ctrl.listTasks);
router.post('/:taskId/proposals', ctrl.createProposal);
router.get('/:taskId/proposals', ctrl.listProposals);
router.post('/:taskId/proposals/:proposalId/accept', ctrl.acceptProposal);
router.post('/:taskId/close', ctrl.closeTask);
router.get('/nearby/search', ctrl.findNearby);

module.exports = router;
