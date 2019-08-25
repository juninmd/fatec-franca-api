import { notFound } from '@hapi/boom';
import { BulkCreateOptions, CreateOptions, DestroyOptions, FindOptions, Sequelize, UpdateOptions } from 'sequelize';
import Entity from '../constants/entity.constant';
import { isAlreadyExistsError, isForeignKeyConstraintError } from '../constants/errors.constant';

export type EntityType = {
  [P in Entity]: any | string;
};
const connection = new Sequelize('mysql://root:asd123@localhost:3306/mydb');

export function dao(key: Entity) {

  const dao = connection.models[Entity[key]];
  return {
    findOne: async (options: {}, throwIfEmptyEnable = true) => {
      const item = (await dao.findOne(options));
      const dataValue = item ? item.toJSON() : null;

      if (!dataValue && throwIfEmptyEnable) {
        throw notFound(Entity[key]);
      }

      return dataValue;
    },
    findAll: async (options?: FindOptions, throwIfEmptyEnable = true) => {
      const result = await dao.findAll(options);
      const dataValues = result.map((e) => {
        return e.toJSON();
      });
      if (!dataValues && throwIfEmptyEnable) {
        throw notFound(Entity[key]);
      }
      return { rows: dataValues, count: undefined };
    },
    findAndCountAll: async (options?: FindOptions, throwIfEmptyEnable = true) => {
      const result = await dao.findAndCountAll(options);
      const dataValues = {
        rows: result.rows.map((e) => {
          return e.toJSON();
        }), count: result.count,
      };

      if (!dataValues && throwIfEmptyEnable) {
        throw notFound(Entity[key]);
      }

      return dataValues;
    },
    create: async (values: {}, options?: CreateOptions) => {
      try {
        return (await dao.create(values, options)).toJSON();
      } catch (error) {
        isForeignKeyConstraintError(error, error.table || Entity[key]);
        isAlreadyExistsError(error, Entity[key]);
        throw error;
      }
    },
    bulkCreate: async (values: [], options?: BulkCreateOptions) => {
      try {
        return (await dao.bulkCreate(values, options));
      } catch (error) {
        isForeignKeyConstraintError(error, error.table || Entity[key]);
        isAlreadyExistsError(error, Entity[key]);
        throw error;
      }
    },
    update: async (values: {}, options: UpdateOptions) => {
      try {
        return await dao.update(values, options);
      } catch (error) {
        isForeignKeyConstraintError(error, error.table || Entity[key]);
        isAlreadyExistsError(error, Entity[key]);
        throw error;
      }
    },
    destroy: async (options: DestroyOptions) => {
      return dao.destroy(options);
    },
  };
}

export function model(key: Entity) {
  return connection.models[Entity[key]];
}
