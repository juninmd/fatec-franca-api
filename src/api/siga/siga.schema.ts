import * as Joi from '@hapi/joi';

export const login = {
  query: Joi.object({
    login: Joi
      .string()
      .required(),
    password: Joi
      .string()
      .required(),
  }).required(),
};