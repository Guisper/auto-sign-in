import os from 'os'
import portfinder from 'portfinder'

import checker from './checker'
import { info } from './output'
import IPAddressModel from '../model/IPAddress.model'

// 获取本机 IPv4 地址
// mac 地址 以 00:50:56 开头的是 VMWare 厂商，跳过
const getIPv4Address = (): string | undefined => {
  const interfaceInfo = os.networkInterfaces()
  for (const key in interfaceInfo) {
    for (const { family, address, internal, mac } of interfaceInfo[key]!) {
      if (family === 'IPv4' && address !== '127.0.0.1' && !internal && !mac.startsWith('00:50:56')) {
        return address
      }
    }
  }
}

// 获取可用的端口号
const getPort = async (): Promise<number> => {
  portfinder.basePort = 3000
  const port = await portfinder.getPortPromise()
  return port
}

// 获取完整的IP地址 IPv4+端口 导出完整地址和端口
const getValidIPAddress = async () => {
  info('获取IPv4地址...')
  const IPv4Address = getIPv4Address()
  const port = await getPort()
  checker(IPv4Address, '获取成功', '无法获取IPv4地址，请检查你的网络连接')
  const IPAddress = IPv4Address + ':' + port
  return { IPAddress, port } as IPAddressModel
}

export default getValidIPAddress
