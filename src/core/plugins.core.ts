import {
  AuthOptions,
  AuthPlugin,
  BlippPlugin,
  DocumentationOptions,
  DocumentationPlugin,
  HealthCheckOptions,
  HealthCheckPlugin,
  LogRequestPlugin,
  NotFoundPlugin,
  ResponseTimePlugin,
  RoutesOptions,
  RoutesPlugin,
  SentryOptions,
  SentryPlugin,
  ServerPlugin,
  VersionOptions,
  VersionPlugin,
} from 'rukia-core-hapi';
import config from '../configs';
import env from '../configs/environment.config';

export const plugins = [
  {
    plugin: RoutesPlugin,
    options: <RoutesOptions>{
      routesBaseDir: config.hapi.routesBaseDir,
      prefix: env.hapi.prefixPath,
    },
  },
  ...((env.plugins.server.enable) ? [{
    plugin: ServerPlugin,
  }] : []),
  ...((env.plugins.version.enable) ? [{
    plugin: VersionPlugin,
    options: <VersionOptions>{
      versionApi: config.hapi.projectVersion,
    },
  }] : []),
  ...((env.plugins.notFound.enable) ? [{
    plugin: NotFoundPlugin,
  }] : []),
  ...((env.plugins.responseTime.enable) ? [{
    plugin: ResponseTimePlugin,
  }] : []),
  {
    plugin: HealthCheckPlugin,
    options: <HealthCheckOptions>{
      prefixPath: env.hapi.prefixPath,
    },
  },
  ...((env.plugins.documentation.enable) ? [{
    plugin: DocumentationPlugin,
    options: <DocumentationOptions>{
      versionApi: config.hapi.projectVersion,
      title: config.hapi.name,
      basePath: env.hapi.prefixPath,
    },
  }] : []),
  ...((env.plugins.auth.enable) ? [{
    plugin: AuthPlugin,
    options: <AuthOptions>{
      key: env.plugins.auth.secret,
    },
  }] : []),
  ...((env.plugins.sentry.enable) ? [{
    plugin: SentryPlugin,
    options: <SentryOptions>{
      dsn: env.plugins.sentry.dsn,
      release: config.hapi.projectVersion,
      environment: env.env,
    },
  }] : []),
  ...((env.plugins.blip.enable) ? [{
    plugin: BlippPlugin, options: { showAuth: env.plugins.blip.showAuth },
  }] : []),
  ...((env.plugins.logRequest.enable) ? [{
    plugin: LogRequestPlugin,
  }] : []),
];

export async function sigterm(server) {
  process.on('SIGTERM', () => {
    console.info('Got SIGTERM. Graceful shutdown start', new Date().toISOString());
    setTimeout(greacefulStop, config.hapi.READINESS_PROBE_DELAY);
  });

  async function greacefulStop() {
    console.info('server is shutting down...', new Date().toISOString());
    try {
      await server.stop({
        timeout: 10000,
      });
      console.info('Successful graceful shutdown', new Date().toISOString());
      process.exit(0);
    } catch (error) {
      console.error('Error happened during graceful shutdown', error);
      process.exit(1);
    }
  }
}