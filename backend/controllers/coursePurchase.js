const { purchaseCourse } = require('../services/coursePurchase');
const logger = require('../utils/logger');

async function purchaseCourseHandler(req, res) {
  const { courseId } = req.params;
  try {
    const purchase = await purchaseCourse(courseId, req.body);
    res.status(201).json(purchase);
  } catch (err) {
    logger.error('Course purchase failed', { error: err.message, courseId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = { purchaseCourseHandler };
