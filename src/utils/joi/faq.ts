import Joi, { AsyncValidationOptions } from 'joi';

const CreateFaqSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  createdBy: Joi.string().required(),
});

const UpdateFaqSchema = Joi.object({
  question: Joi.string().optional(),
  answer: Joi.string().optional(),
  lastModifiedBy: Joi.string().required(),
});

export function validateCreateFaq(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return CreateFaqSchema.validateAsync(data, options);
}

export function validateUpdateFaq(
  data: unknown,
  options: AsyncValidationOptions = { abortEarly: false }
): Promise<unknown> {
  return UpdateFaqSchema.validateAsync(data, options);
}
