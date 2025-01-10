import Joi, { AsyncValidationOptions } from 'joi';

const CreatePrivacyPolicySchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  delta: Joi.string().optional().allow('').allow(null),
  createdBy: Joi.string().required(),
  metaTitle: Joi.string().optional(),
  metaDescription: Joi.string().optional(),
  metaTags: Joi.string().optional(),
});

const UpdatePrivacyPolicySchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  delta: Joi.string().optional().allow('').allow(null),
  lastModifiedBy: Joi.string().required(),
  metaTitle: Joi.string().optional(),
  metaDescription: Joi.string().optional(),
  metaTags: Joi.string().optional(),
});

export function validateCreatePrivacyPolicy(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return CreatePrivacyPolicySchema.validateAsync(data, options);
}

export function validateUpdatePrivacyPolicy(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return UpdatePrivacyPolicySchema.validateAsync(data, options);
}
