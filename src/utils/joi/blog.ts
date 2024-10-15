import Joi, { AsyncValidationOptions } from 'joi';

const CreateBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  createdBy: Joi.string().required(),
  headerImage: Joi.string().optional(),
  metaTitle: Joi.string().optional(),
  metaDescription: Joi.string().optional(),
  metaTags: Joi.string().optional(),
});

const UpdateBlogSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  lastModifiedBy: Joi.string().required(),
  headerImage: Joi.string().optional(),
  metaTitle: Joi.string().optional(),
  metaDescription: Joi.string().optional(),
  metaTags: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

export function validateCreateBlog(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return CreateBlogSchema.validateAsync(data, options);
}

export function validateUpdateBlog(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return UpdateBlogSchema.validateAsync(data, options);
}
