import Joi, { AsyncValidationOptions } from 'joi';

const CreateBannerSchema = Joi.object({
  imageUrl: Joi.string().required(),
  webLink: Joi.string().required(),
  appLink: Joi.string().optional(),
  createdBy: Joi.string().required(),
  query: Joi.object().optional(),
});

const UpdateBannerSchema = Joi.object({
  imageUrl: Joi.string().optional(),
  webLink: Joi.string().optional(),
  appLink: Joi.string().optional(),
  query: Joi.object().optional(),
  lastModifiedBy: Joi.string().required(),
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
