const locale: string = 'zh-CN'
const currentTime: number = Date.now()

const suffixes: Array<string> = ['年', '月', '日']

const getDateString = (date?: number): string => new Date(date ?? currentTime).toLocaleDateString(locale)
const getFormattedString = (): string =>
  getDateString()
    .split('/')
    .map((e, i) => e + suffixes[i])
    .join('')

export default getFormattedString
