const express = require('express');
const {
  submitProjectHandler,
  getProjectHandler,
  startCollaborativeProjectHandler,
  submitExternalProjectHandler,
} = require('../controllers/project');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const projectExists = require('../middleware/project');
const {
  pathIdParamSchema,
  projectIdParamSchema,
  userIdParamSchema,
  projectSubmissionSchema,
  collaborativeProjectSchema,
} = require('../validation/project');

const router = express.Router();

router.post('/submit/:pathId', auth, validate(pathIdParamSchema, 'params'), validate(projectSubmissionSchema), submitProjectHandler);
router.get('/:projectId', auth, validate(projectIdParamSchema, 'params'), projectExists, getProjectHandler);
router.post('/collaborative/:pathId', auth, validate(pathIdParamSchema, 'params'), validate(collaborativeProjectSchema), startCollaborativeProjectHandler);
router.post('/external/submit/:userId', auth, validate(userIdParamSchema, 'params'), validate(projectSubmissionSchema), submitExternalProjectHandler);

module.exports = router;
