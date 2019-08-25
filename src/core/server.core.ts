import * as Hapi from '@hapi/hapi';
import * as DnsCache from 'dnscache';
import config from '../configs';
import env from '../configs/environment.config';
import { plugins, sigterm } from './plugins.core';

const { host, port } = env.hapi;
const { routes } = config.hapi;

const server = new Hapi.Server({
  host,
  port,
  routes,
});

(async () => {
  sigterm(server);

  DnsCache({ enable: true, ttl: 300, cachesize: 1000 });

  await server.register(plugins);
  if (process.env.NODE_ENV !== 'test') {
    await server.start();
    console.log('\x1b[36m%s\x1b[0m', `*** [${config.hapi.name}] - v${config.hapi.projectVersion} ***`);
  }
  return server;

})();

export default server;