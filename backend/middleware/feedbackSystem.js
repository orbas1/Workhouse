const validate = require('./validate');
const {
  sessionFeedbackSchema,
  sessionDetailSchema,
  mentorRewardSchema,
  goalProgressSchema,
  sessionIdParam,
  menteeIdParam,
  mentorIdParam,
  userIdParam,
} = require('../validation/feedbackSystem');

module.exports = {
  validateSessionFeedback: [
    validate(sessionIdParam, 'params'),
    validate(sessionFeedbackSchema),
  ],
  validateProgressReview: [validate(menteeIdParam, 'params')],
  validateAnalytics: [validate(userIdParam, 'params')],
  validateRewards: [
    validate(mentorIdParam, 'params'),
    validate(mentorRewardSchema),
  ],
  validateSessionDetail: [
    validate(sessionIdParam, 'params'),
    validate(sessionDetailSchema),
  ],
  validateMentorSummary: [validate(mentorIdParam, 'params')],
  validateGoalProgress: [
    validate(menteeIdParam, 'params'),
    validate(goalProgressSchema),
  ],
};
