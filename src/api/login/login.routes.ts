import * as Hapi from '@hapi/hapi';
import { login } from './login.schema';

import Controller from './login.controller';

export default async (server: Hapi.Server) => {
  const controller = new Controller();
  server.bind(controller);

  server.route([{
    method: 'GET',
    path: '/login',
    handler: controller.login,
    options: {
      tags: ['api'],
      validate: login,
    },
  }]);
};