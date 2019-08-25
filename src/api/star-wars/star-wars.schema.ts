import * as Joi from '@hapi/joi';

export const listPeople = {
  query: Joi.object({
    page: Joi
      .number()
      .integer()
      .min(1)
      .default(1)
      .required(),
    pageb: Joi
      .number()
      .integer()
      .min(1)
      .default(1)
      .required(),
  }).required(),
};

export const readPeople = {
  params: Joi.object({
    id: Joi
      .number()
      .integer()
      .min(1)
      .default(1),
  }),
};