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
  addModuleHandler,
  updateModuleHandler,
  deleteModuleHandler,
} = require('../controllers/course');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createCourseSchema,
  updateCourseSchema,
  feedbackSchema,
  courseIdParamSchema,
  categoryIdParamSchema,
  instructorIdParamSchema,
  moduleSchema,
  moduleIdParamSchema,
} = require('../validation/course');

const router = express.Router();

router.post('/create', auth, validate(createCourseSchema), createCourseHandler);
router.put('/update/:courseId', auth, validate(courseIdParamSchema, 'params'), validate(updateCourseSchema), updateCourseHandler);
router.delete('/:courseId', auth, validate(courseIdParamSchema, 'params'), deleteCourseHandler);
router.post('/:courseId/feedback', auth, validate(courseIdParamSchema, 'params'), validate(feedbackSchema), submitFeedbackHandler);
router.post('/:courseId/modules', auth, validate(courseIdParamSchema, 'params'), validate(moduleSchema), addModuleHandler);
router.put('/:courseId/modules/:moduleId', auth, validate(courseIdParamSchema, 'params'), validate(moduleIdParamSchema, 'params'), validate(moduleSchema.min(1)), updateModuleHandler);
router.delete('/:courseId/modules/:moduleId', auth, validate(courseIdParamSchema, 'params'), validate(moduleIdParamSchema, 'params'), deleteModuleHandler);
router.get('/category/:categoryId', auth, validate(categoryIdParamSchema, 'params'), getCoursesByCategoryHandler);
router.get('/instructor/:instructorId', auth, validate(instructorIdParamSchema, 'params'), getCoursesByInstructorHandler);
router.get('/:courseId', auth, validate(courseIdParamSchema, 'params'), getCourseHandler);
router.get('/', auth, listCoursesHandler);

module.exports = router;
