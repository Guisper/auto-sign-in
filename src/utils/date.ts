const locale: string = 'zh-CN'
const currentTime: number = Date.now()

const suffixes: Array<string> = ['年', '月', '日']

const getDateString = (date?: number): string => new Date(date ?? currentTime).toLocaleDateString(locale)

// 获取 yyyy年mm月dd日 的日期字符串，兼容不同运行环境
const getFormattedString = (): string => {
  const dateString: string = getDateString()
  const date: Array<Array<string>> = [dateString.split('/'), dateString.split('-')]
  return date
    .find(d => d.length === 3)!
    .map((e, i) => e + suffixes[i])
    .join('')
}

export default getFormattedString
