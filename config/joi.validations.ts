import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  ENVIRONMENT: Joi.string().default('DEV'),
  TURSO_DATABASE_URL: Joi.string().required(),
  TURSO_AUTH_TOKEN: Joi.string().required(),
  LOCAL_DATABASE_URL: Joi.string().default('./drizzle/sqlite.db'),
});
