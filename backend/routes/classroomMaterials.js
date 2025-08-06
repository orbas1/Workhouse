const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { addMaterialHandler, listMaterialsHandler } = require('../controllers/classroomMaterials');
const { classroomIdParamSchema, materialSchema } = require('../validation/classroomMaterials');

router.post(
  '/:classroomId/material',
  validate(classroomIdParamSchema, 'params'),
  validate(materialSchema, 'body'),
  addMaterialHandler
);

router.get(
  '/:classroomId/materials',
  validate(classroomIdParamSchema, 'params'),
  listMaterialsHandler
);

module.exports = router;
