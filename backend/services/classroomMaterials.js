const model = require('../models/classroomMaterials');
const logger = require('../utils/logger');

async function createMaterial(classroomId, type, title, url) {
  const material = model.addMaterial(classroomId, type, title, url);
  logger.info('Classroom material created', { classroomId, type });
  return material;
}

async function listMaterials(classroomId) {
  const materials = model.getMaterials(classroomId);
  logger.info('Classroom materials retrieved', { classroomId, count: materials.length });
  return materials;
}

module.exports = { createMaterial, listMaterials };
