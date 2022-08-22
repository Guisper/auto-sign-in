import { stdout } from 'single-line-log'
const { env: { ACCOUNT }, exit } = process

const second: number = 1000
const quitImmediately: boolean = !!ACCOUNT

const slog = (countdown: number): void => stdout(countdown / second + '秒后自动退出...\n')

const quit = (timer: number = 30000, code: number = 1) => {
  quitImmediately && exit(code)
  let countdown = timer
  slog(countdown)
  const id = setInterval(() => {
    countdown -= second
    slog(countdown)
  }, second)

  setTimeout(() => {
    clearInterval(id)
    exit(code)
  }, timer)
}

export default quit