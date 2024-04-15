import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  ENVIRONMENT: Joi.string().default('dev'),
  TURSO_DATABASE_URL: Joi.string().required(),
  TURSO_DATABASE_TOKEN: Joi.string().required(),
});
