import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  MONGODB_HOST: Joi.string().required(),
});
