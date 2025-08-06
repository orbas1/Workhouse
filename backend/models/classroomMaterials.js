const { randomUUID } = require('crypto');

// In-memory store mapping classroomId to array of materials
const materialStore = new Map();

function addMaterial(classroomId, type, title, url) {
  const material = {
    id: randomUUID(),
    classroomId,
    type,
    title,
    url,
  };
  if (!materialStore.has(classroomId)) {
    materialStore.set(classroomId, []);
  }
  materialStore.get(classroomId).push(material);
  return material;
}

function getMaterials(classroomId) {
  return materialStore.get(classroomId) || [];
}

module.exports = { addMaterial, getMaterials };
