const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  listCourses,
  submitFeedback,
  getCoursesByCategory,
  getCoursesByInstructor,
} = require('../services/course');
const logger = require('../utils/logger');

async function createCourseHandler(req, res) {
  try {
    const course = await createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    logger.error('Failed to create course', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function updateCourseHandler(req, res) {
  const { courseId } = req.params;
  try {
    const course = await updateCourse(courseId, req.body);
    res.json(course);
  } catch (err) {
    logger.error('Failed to update course', { error: err.message, courseId });
    res.status(404).json({ error: err.message });
  }
}

async function deleteCourseHandler(req, res) {
  const { courseId } = req.params;
  try {
    await deleteCourse(courseId);
    res.json({ success: true });
  } catch (err) {
    logger.error('Failed to delete course', { error: err.message, courseId });
    res.status(404).json({ error: err.message });
  }
}

async function getCourseHandler(req, res) {
  const { courseId } = req.params;
  try {
    const course = await getCourse(courseId);
    res.json(course);
  } catch (err) {
    logger.error('Failed to retrieve course', { error: err.message, courseId });
    res.status(404).json({ error: err.message });
  }
}

async function listCoursesHandler(req, res) {
  try {
    const courses = await listCourses();
    res.json(courses);
  } catch (err) {
    logger.error('Failed to list courses', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function submitFeedbackHandler(req, res) {
  const { courseId } = req.params;
  try {
    const course = await submitFeedback(courseId, req.body);
    res.json(course);
  } catch (err) {
    logger.error('Failed to submit course feedback', { error: err.message, courseId });
    res.status(404).json({ error: err.message });
  }
}

async function getCoursesByCategoryHandler(req, res) {
  const { categoryId } = req.params;
  try {
    const courses = await getCoursesByCategory(categoryId);
    res.json(courses);
  } catch (err) {
    logger.error('Failed to fetch courses by category', { error: err.message, categoryId });
    res.status(400).json({ error: err.message });
  }
}

async function getCoursesByInstructorHandler(req, res) {
  const { instructorId } = req.params;
  try {
    const courses = await getCoursesByInstructor(instructorId);
    res.json(courses);
  } catch (err) {
    logger.error('Failed to fetch courses by instructor', { error: err.message, instructorId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createCourseHandler,
  updateCourseHandler,
  deleteCourseHandler,
  getCourseHandler,
  listCoursesHandler,
  submitFeedbackHandler,
  getCoursesByCategoryHandler,
  getCoursesByInstructorHandler,
};
