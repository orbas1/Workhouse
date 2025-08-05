const express = require('express');
const {
  createCourseHandler,
  updateCourseHandler,
  deleteCourseHandler,
  getCourseHandler,
  listCoursesHandler,
  submitFeedbackHandler,
  getCoursesByCategoryHandler,
  getCoursesByInstructorHandler,
} = require('../controllers/course');
const { purchaseCourseHandler } = require('../controllers/coursePurchase');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createCourseSchema,
  updateCourseSchema,
  feedbackSchema,
  courseIdParamSchema,
  categoryIdParamSchema,
  instructorIdParamSchema,
  purchaseSchema,
} = require('../validation/course');

const router = express.Router();

router.post('/create', auth, validate(createCourseSchema), createCourseHandler);
router.put('/update/:courseId', auth, validate(courseIdParamSchema, 'params'), validate(updateCourseSchema), updateCourseHandler);
router.delete('/:courseId', auth, validate(courseIdParamSchema, 'params'), deleteCourseHandler);
router.post('/:courseId/feedback', auth, validate(courseIdParamSchema, 'params'), validate(feedbackSchema), submitFeedbackHandler);
router.post('/:courseId/purchase', auth, validate(courseIdParamSchema, 'params'), validate(purchaseSchema), purchaseCourseHandler);
router.get('/category/:categoryId', auth, validate(categoryIdParamSchema, 'params'), getCoursesByCategoryHandler);
router.get('/instructor/:instructorId', auth, validate(instructorIdParamSchema, 'params'), getCoursesByInstructorHandler);
router.get('/:courseId', auth, validate(courseIdParamSchema, 'params'), getCourseHandler);
router.get('/', auth, listCoursesHandler);

module.exports = router;
