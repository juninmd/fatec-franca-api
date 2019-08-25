import { conflict, notFound } from '@hapi/boom';

export const throwIfEmpty = (description: string): (entity: any) => void => {
  return (entity: any) => {
    if (entity === null || entity === undefined) {
      throw notFound(description);
    }
  };
};

export const isAlreadyExistsError = (error, description) => {
  if ((error.message === 'Validation error' &&
    error.name === 'SequelizeUniqueConstraintError') ||
    error.code === 'ER_DUP_ENTRY') {
    throw conflict(description);
  }
};

export const isForeignKeyConstraintError = (error, description) => {
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    throw conflict(description);
  }
};
