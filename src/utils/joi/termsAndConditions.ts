import Joi, { AsyncValidationOptions } from 'joi';

const CreateTermsAndConditionsSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    createdBy: Joi.string().required(),
    metaTitle: Joi.string().optional(),
    metaDescription: Joi.string().optional(),
    metaTags: Joi.string().optional(),
});

const UpdateTermsAndConditionsSchema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
    lastModifiedBy: Joi.string().required(),
    metaTitle: Joi.string().optional(),
    metaDescription: Joi.string().optional(),
    metaTags: Joi.string().optional(),
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
