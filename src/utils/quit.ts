import { stdout } from 'single-line-log'

const second = 1000

const slog = (countdown: number): void => stdout(countdown / second + '秒后自动退出...')

const quit = (timer: number = 30000, code: number = 1) => {
  let countdown = timer
  slog(countdown)
  const id = setInterval(() => {
    countdown -= second
    slog(countdown)
  }, second)

  setTimeout(() => {
    clearInterval(id)
    process.exit(code)
  }, timer)
}

export default quit