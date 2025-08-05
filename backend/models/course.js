const { randomUUID } = require('crypto');

const courses = new Map();

function createCourse({ title, description, categoryId, instructorId, type, price }) {
  const id = randomUUID();
  const now = new Date();
  const course = {
    id,
    title,
    description: description || null,
    categoryId,
    instructorId,
    type,
    price: Number(price) || 0,
    feedback: [],
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

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  findById,
  findAll,
  addFeedback,
  findByCategory,
  findByInstructor,
};
