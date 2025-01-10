import Joi, { AsyncValidationOptions } from 'joi';

const CreateTermsAndConditionsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  delta: Joi.string().optional().allow('').allow(null),
  createdBy: Joi.string().required(),
  metaTitle: Joi.string().optional().allow('').allow(null),
  metaDescription: Joi.string().optional().allow('').allow(null),
  metaTags: Joi.string().optional().allow('').allow(null),
});

const UpdateTermsAndConditionsSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  delta: Joi.string().optional().allow('').allow(null),
  lastModifiedBy: Joi.string().required(),
  metaTitle: Joi.string().optional().allow('').allow(null),
  metaDescription: Joi.string().optional().allow('').allow(null),
  metaTags: Joi.string().optional().allow('').allow(null),
});

export function validateCreateTermsAndConditions(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return CreateTermsAndConditionsSchema.validateAsync(data, options);
}

export function validateUpdateTermsAndConditions(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return UpdateTermsAndConditionsSchema.validateAsync(data, options);
}
