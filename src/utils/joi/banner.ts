import Joi, { AsyncValidationOptions } from 'joi';

const CreateBannerSchema = Joi.object({
  imageUrl: Joi.string().required(),
  fileType: Joi.string().valid(...['IMAGE', 'VIDEO']).required(),
  webLink: Joi.string().required(),
  appLink: Joi.string().optional(),
  createdBy: Joi.string().required(),
  query: Joi.object().optional(),
});

const UpdateBannerSchema = Joi.object({
  imageUrl: Joi.string().optional(),
  fileType: Joi.string().valid(...['IMAGE', 'VIDEO']).optional(),
  webLink: Joi.string().optional().allow('').allow(null),
  appLink: Joi.string().optional().allow('').allow(null),
  query: Joi.object().optional(),
  lastModifiedBy: Joi.string().required(),
  isActive: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
});

export function validateCreateBanner(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return CreateBannerSchema.validateAsync(data, options);
}

export function validateUpdateBanner(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return UpdateBannerSchema.validateAsync(data, options);
}
