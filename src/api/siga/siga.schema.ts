import * as Joi from '@hapi/joi';

export const login = {
  query: {
    login: Joi
      .string()
      .required(),
    password: Joi
      .string()
      .required(),
  },
};