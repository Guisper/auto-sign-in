import chalk from 'chalk'
const { log } = console

const info = (str: string): void => log(chalk.cyanBright(str))
const warn = (str: string): void => log(chalk.yellowBright(str))
const success = (str: string): void => log(chalk.greenBright(str))
const error = (str: string, reason: string): void => log(chalk.redBright(str), chalk.magentaBright(reason))

export { info, warn, success, error }
