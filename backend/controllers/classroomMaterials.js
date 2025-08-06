const { createMaterial, listMaterials } = require('../services/classroomMaterials');

async function addMaterialHandler(req, res, next) {
  try {
    const { classroomId } = req.params;
    const { type, title, url } = req.body;
    const material = await createMaterial(classroomId, type, title, url);
    res.status(201).json(material);
  } catch (err) {
    next(err);
  }
}

async function listMaterialsHandler(req, res, next) {
  try {
    const { classroomId } = req.params;
    const materials = await listMaterials(classroomId);
    res.json(materials);
  } catch (err) {
    next(err);
  }
}

module.exports = { addMaterialHandler, listMaterialsHandler };
