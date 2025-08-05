const { randomUUID } = require('crypto');

const courses = new Map();

function createCourse({ title, description, categoryId, instructorId, type }) {
  const id = randomUUID();
  const now = new Date();
  const course = {
    id,
    title,
    description: description || null,
    categoryId,
    instructorId,
    type,
    feedback: [],
    modules: [],
    createdAt: now,
    updatedAt: now,
  };
  courses.set(id, course);
  return course;
}

function updateCourse(id, updates) {
  const course = courses.get(id);
  if (!course) return null;
  const updated = { ...course, ...updates, updatedAt: new Date() };
  courses.set(id, updated);
  return updated;
}

function deleteCourse(id) {
  return courses.delete(id);
}

function findById(id) {
  return courses.get(id);
}

function findAll() {
  return Array.from(courses.values());
}

function addFeedback(courseId, feedback) {
  const course = courses.get(courseId);
  if (!course) return null;
  course.feedback.push({ id: randomUUID(), ...feedback, createdAt: new Date() });
  return course;
}

function findByCategory(categoryId) {
  return findAll().filter(c => c.categoryId === categoryId);
}

function findByInstructor(instructorId) {
  return findAll().filter(c => c.instructorId === instructorId);
}

function addModule(courseId, { title, content }) {
  const course = courses.get(courseId);
  if (!course) return null;
  const module = { id: randomUUID(), title, content: content || null, createdAt: new Date(), updatedAt: new Date() };
  course.modules.push(module);
  course.updatedAt = new Date();
  return module;
}

function updateModule(courseId, moduleId, updates) {
  const course = courses.get(courseId);
  if (!course) return null;
  const idx = course.modules.findIndex(m => m.id === moduleId);
  if (idx === -1) return null;
  const updated = { ...course.modules[idx], ...updates, updatedAt: new Date() };
  course.modules[idx] = updated;
  course.updatedAt = new Date();
  return updated;
}

function removeModule(courseId, moduleId) {
  const course = courses.get(courseId);
  if (!course) return null;
  const idx = course.modules.findIndex(m => m.id === moduleId);
  if (idx === -1) return null;
  course.modules.splice(idx, 1);
  course.updatedAt = new Date();
  return true;
}

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  findById,
  findAll,
  addFeedback,
  findByCategory,
  findByInstructor,
  addModule,
  updateModule,
  removeModule,
};
