import fs from 'fs'
import { success, info } from './output'

// 若文件夹不存在则创建
const checkDir = (path: string): Promise<void> => {
  info('checkDir: ' + path)
  return new Promise((resolve, reject) => {
    fs.access(path, err => {
      err ? fs.mkdir(path, e => (e ? reject(e) : resolve())) : resolve()
    })
  })
}

// 用来读文件的，可选择是否解析为 JSON，对一些错误作了处理
const reader = (path: string, parse: boolean = true): Promise<[boolean, any]> => {
  info('reader: ' + path)
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

// 用来写文件的
const writer = (path: string, data: string): Promise<void> => {
  info('writer: ' + path)
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      err ? reject('文件写入错误') : resolve(success('文件写入成功'))
    })
  })
}

export { checkDir, reader, writer }
