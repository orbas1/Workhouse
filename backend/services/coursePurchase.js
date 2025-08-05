const courseModel = require('../models/course');
const purchaseModel = require('../models/coursePurchase');
const logger = require('../utils/logger');

async function purchaseCourse(courseId, data) {
  const course = courseModel.findById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }
  const purchase = purchaseModel.createPurchase({ courseId, ...data });
  logger.info('Course purchased', { courseId, userId: data.userId });
  return { ...purchase, courseTitle: course.title };
}

module.exports = { purchaseCourse };
