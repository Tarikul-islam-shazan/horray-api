import * as Joi from 'joi';

export const configValidation = Joi.object({
  APP_PORT: Joi.string().required(),
  MONGODB_URL: Joi.string().required(),
  MONGODB_PORT: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE: Joi.string().required(),
  AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
  AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_BUCKET_NAME: Joi.string().required(),
});
