import * as Hapi from '@hapi/hapi';
import * as path from 'path';

// tslint:disable-next-line:no-var-requires
const pack = require('../../package.json');

export default {
  hapi: {
    name: pack.name,
    description: pack.description,
    projectVersion: pack.version,
    READINESS_PROBE_DELAY: 10 * 5 * 1000,
    root: path.normalize(path.join(__dirname, '/../..')),
    routesBaseDir: path.normalize(path.join(__dirname, '/../api')),
    routes: <Hapi.RouteOptions>{
      cors: {
        additionalExposedHeaders: ['authorization', 'Access-Control-Allow-Origin', 'x-error-message'],
        credentials: true,
      },
      state: {
        parse: false,
        failAction: 'ignore',
      },
      validate: {
        failAction: (_, __, err) => {
          throw err;
        },
        options: {
          abortEarly: true,
        },
      },
    },
  },

};