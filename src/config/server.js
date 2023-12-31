import chalk from "chalk";

const { NODE_ENV, DL_PORT } = process.env;

export const config = {
  port: DL_PORT || 3001,
};

const printServerConfig = () => (
  NODE_ENV !== 'test' && console.info(chalk.cyan('Server:'), JSON.stringify(config, null, ' '))
);

printServerConfig();
