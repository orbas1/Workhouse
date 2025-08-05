const express = require('express');
const {
  addClientHandler,
  listClientsHandler,
  updateClientHandler,
  removeClientHandler,
} = require('../controllers/client');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  addClientSchema,
  updateClientSchema,
  clientIdParamSchema,
  agencyIdParamSchema,
} = require('../validation/client');

const router = express.Router();

router.post('/clients/add', auth, validate(addClientSchema), addClientHandler);
router.get('/:agencyId/clients', auth, validate(agencyIdParamSchema, 'params'), listClientsHandler);
router.put('/clients/update/:clientId', auth, validate(clientIdParamSchema, 'params'), validate(updateClientSchema), updateClientHandler);
router.delete('/clients/remove/:clientId', auth, validate(clientIdParamSchema, 'params'), removeClientHandler);

module.exports = router;
