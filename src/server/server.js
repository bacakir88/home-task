import chalk from 'chalk';
import { config } from '../config/server.js';
import { app }  from '../app.js';
import { handleFatalError } from '../utils/logger.js';

const initServer = () => {
  try {
    app.listen(config.port, () => {
      console.info(chalk.green(`
        Server running in http://localhost:${config.port}/
        Running with NodeJS ${process.version}`));
    });
  } catch (error) {
    handleFatalError();
  }
};

initServer();
