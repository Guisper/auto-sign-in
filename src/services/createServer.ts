import express from 'express'
import qrcode from 'qrcode-terminal'

import { staticPath, staticPagePath } from '../utils/path'
import reader from '../utils/reader'
import getValidIPAddress from '../utils/networkAddress'
import { success, info } from '../utils/output'

const createServer = async (): Promise<void> => {
  // 读取本地文件：打卡的页面结果
  const [pageNotExists, page] = await reader(staticPagePath, false)
  // 获取本机 IPv4 地址和可用的端口
  const { IPAddress, port } = await getValidIPAddress()

  const app = express()
  info('启动服务器...')
  app
    .use('/static', express.static(staticPath))
    .get('/', (_, res) => {
      pageNotExists
        ? res.status(500).send('Server Internal Error: Can Not Read File, Path: ' + staticPagePath)
        : res.status(200).setHeader('Content-Type', 'text/html').send(page)
    })
    .listen(port, () => {
      // 监听端口 生成二维码
      success('服务已启动')
      info(`本机地址  : http://localhost:${port}`)
      info(`局域网地址: http://${IPAddress}`)
      info('你可以扫描下面的二维码用同一局域网下的设备访问：')
      qrcode.generate(IPAddress)
    })
}

export default createServer
