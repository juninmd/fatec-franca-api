import * as Hapi from '@hapi/hapi';
import { listPeople, readPeople } from './star-wars.schema';

import Controller from './star-wars.controller';

export default async (server: Hapi.Server) => {
  const controller = new Controller();
  server.bind(controller);

  server.route([{
    method: 'GET',
    path: '/star-wars/people',
    handler: controller.listPeople,
    options: {
      tags: ['api'],
      validate: listPeople,
    },
  }, {
    method: 'GET',
    path: '/star-wars/people/{id}',
    handler: controller.readPeople,
    options: {
      description: 'read people from star wars',
      tags: ['api'],
      validate: readPeople,
    },
  }]);
};