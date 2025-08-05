const Joi = require('joi');

const domainParamSchema = Joi.object({
  domain: Joi.string().min(1).required(),
});

const trainSchema = Joi.object({
  dataset: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().min(1).required(),
        label: Joi.string().valid('positive', 'negative', 'neutral').required(),
      })
    )
    .min(1)
    .required(),
});

const customTextSchema = Joi.object({
  text: Joi.string().min(1).required(),
});

const feedbackSchema = Joi.object({
  text: Joi.string().min(1).required(),
  label: Joi.string().valid('positive', 'negative', 'neutral').required(),
});

module.exports = {
  domainParamSchema,
  trainSchema,
  customTextSchema,
  feedbackSchema,
};
