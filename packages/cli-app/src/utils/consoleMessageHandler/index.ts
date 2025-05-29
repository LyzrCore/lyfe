import chalk from "chalk";

const ConsoleMessageHandler = {
  INFO: (msg: string) => console.log(chalk.blue(`Info: ${msg}`)),
  ERROR: (msg: string) => console.log(chalk.red(`Error: ${msg}`)),
  SUCCESS: (msg: string) => console.log(chalk.green(`Success: ${msg}`)),
  WARNING: (msg: string) => console.log(chalk.yellow(`Warning: ${msg}`)),
  TEXT: (msg: string) => console.log(chalk.white(`${msg}`)),
};

export default ConsoleMessageHandler;
