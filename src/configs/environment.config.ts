import * as path from 'path';
import { addEnv, checkEnvs, loadEnvs } from 'rukia-core-hapi';

(() => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const NODE_ENV = process.env.NODE_ENV;
  const envPath = path.join(__dirname, `/../../${`/env/.env-${NODE_ENV}`}`);
  loadEnvs(envPath);
})();

export default {
  env: addEnv({ key: 'NODE_ENV' }),
  hapi: {
    prefixPath: addEnv({ key: 'PREFIX_PATH', value: '/fatec-franca/v1' }),
    routesTimeout: addEnv<number>({ key: 'ROUTES_TIMEOUT', value: '1000' }),
    host: addEnv({ key: 'HOST', value: '0.0.0.0' }),
    port: addEnv({ key: 'PORT', value: '8000' }),
  },
  plugins: {
    server: {
      enable: addEnv<boolean>({ key: 'RESPONSE_SERVER_ENABLE', value: true }),
    },
    logRequest: {
      enable: addEnv<boolean>({ key: 'HTTP_LOG_REQUEST', value: true }),
    },
    sentry: {
      enable: addEnv<boolean>({ key: 'SENTRY_ENABLE', value: false }),
      dsn: addEnv({ key: 'SENTRY_DSN', value: '', required: false }),
    },
    version: {
      enable: addEnv<boolean>({ key: 'VERSION_ENABLE', value: true }),
    },
    healtCheck: {
      enable: addEnv<boolean>({ key: 'HEALTH_CHECK_ENABLE', value: true }),
    },
    auth: {
      enable: addEnv<boolean>({ key: 'AUTH_ENABLE', value: true }),
      secret: addEnv({ key: 'SECRET', value: 'stubJWT' }),
    },
    documentation: {
      enable: addEnv<boolean>({ key: 'DOC_ENABLE', value: true }),
    },
    blip: {
      enable: addEnv<boolean>({ key: 'BLIP_ENABLE', value: true }),
      showAuth: addEnv<boolean>({ key: 'BLIP_SHOW_AUTH', value: true }),
    },
    notFound: {
      enable: addEnv<boolean>({ key: 'NOT_FOUND_ENABLE', value: true }),
    },
    responseTime: {
      enable: addEnv<boolean>({ key: 'RESPONSE_TIME_ENABLE', value: true }),
    },
  },
};

checkEnvs();