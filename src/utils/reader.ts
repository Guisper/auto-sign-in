import fs from 'fs'

// 用来读文件的 可选择是否解析读取后的内容 对一些错误作了处理
const reader = (path: string, parse: boolean = true): Promise<[boolean, string | object | null]> => {
  return new Promise((resolve, reject) => {
    fs.stat(path, async (_, stat) => {
      if (stat?.isFile()) {
        fs.readFile(path, 'utf-8', (err, data) => {
          if (parse) {
            try {
              const res: object | string = (data && JSON.parse(data)) || ''
              err ? reject(err) : res ? resolve([false, res as object]) : reject('文件内容为空')
            } catch (e) {
              reject(new Error('文件解析错误'))
            }
          } else {
            resolve([false, data as string])
          }
        })
      } else {
        resolve([true, null])
      }
    })
  })
}

export default reader
