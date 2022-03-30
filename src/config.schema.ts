import * as Joi from 'joi';

export const configValidation = Joi.object({
  APP_PORT: Joi.string().required(),
  MONGODB_URL: Joi.string().required(),
  MONGODB_PORT: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE: Joi.string().required(),
});
