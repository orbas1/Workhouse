const courseModel = require('../models/course');
const logger = require('../utils/logger');

async function createCourse(data) {
  const course = courseModel.createCourse(data);
  logger.info('Course created', { courseId: course.id, instructorId: course.instructorId });
  return course;
}

async function updateCourse(courseId, updates) {
  const course = courseModel.updateCourse(courseId, updates);
  if (!course) {
    throw new Error('Course not found');
  }
  logger.info('Course updated', { courseId });
  return course;
}

async function deleteCourse(courseId) {
  const removed = courseModel.deleteCourse(courseId);
  if (!removed) {
    throw new Error('Course not found');
  }
  logger.info('Course deleted', { courseId });
  return { success: true };
}

async function getCourse(courseId) {
  const course = courseModel.findById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }
  return course;
}

async function listCourses() {
  return courseModel.findAll();
}

async function submitFeedback(courseId, feedback) {
  const course = courseModel.addFeedback(courseId, feedback);
  if (!course) {
    throw new Error('Course not found');
  }
  logger.info('Feedback submitted', { courseId, userId: feedback.userId });
  return course;
}

async function getCoursesByCategory(categoryId) {
  return courseModel.findByCategory(categoryId);
}

async function getCoursesByInstructor(instructorId) {
  return courseModel.findByInstructor(instructorId);
}

async function addModule(courseId, data) {
  const module = courseModel.addModule(courseId, data);
  if (!module) {
    throw new Error('Course not found');
  }
  logger.info('Module added to course', { courseId, moduleId: module.id });
  return module;
}

async function updateModule(courseId, moduleId, updates) {
  const module = courseModel.updateModule(courseId, moduleId, updates);
  if (!module) {
    throw new Error('Module not found');
  }
  logger.info('Module updated', { courseId, moduleId });
  return module;
}

async function deleteModule(courseId, moduleId) {
  const removed = courseModel.removeModule(courseId, moduleId);
  if (!removed) {
    throw new Error('Module not found');
  }
  logger.info('Module removed', { courseId, moduleId });
  return { success: true };
}

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  listCourses,
  submitFeedback,
  getCoursesByCategory,
  getCoursesByInstructor,
  addModule,
  updateModule,
  deleteModule,
};
