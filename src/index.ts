import './configs/environment.config';
import './core/server.core';

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

process.on('unhandledRejection', (error: any) => {
  console.error(`unhandledRejection - ${error.code} - ${error.message}`);
});
