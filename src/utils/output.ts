import chalk from 'chalk'
const { log } = console

const info = (str: string): void => log(chalk.cyan(str))
const warn = (str: string): void => log(chalk.yellow(str))
const success = (str: string): void => log(chalk.green(str))
const error = (str: string, reason: string): void => log(chalk.red(str), chalk.magentaBright(reason))

export { info, warn, success, error }
