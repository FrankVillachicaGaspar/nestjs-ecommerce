import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  ENVIRONMENT: Joi.string().default('DEV'),
  TURSO_DATABASE_URL: Joi.string(),
  TURSO_AUTH_TOKEN: Joi.string(),
  LOCAL_DATABASE_URL: Joi.string().default('./drizzle/sqlite.db'),
  JWT_SECRET: Joi.string(),
});
