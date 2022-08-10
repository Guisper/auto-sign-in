import fs from 'fs'
import { success } from './output'

// 用来写文件的
const writer = (path: string, data: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      err ? reject('文件写入错误') : resolve(success('文件写入成功'))
    })
  })
}

export default writer
