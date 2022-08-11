import axios from 'axios'

import { info } from '../utils/output'
import { idParser } from '../utils/parser'
import checker from '../utils/checker'

const getUserId = async (url: string): Promise<string> => {
  info('尝试获取id...')
  const { data } = await axios.get(url)
  const id = idParser(data)
  checker(id, '获取成功：' + id!.substring(0, 4).padEnd(40, '*') + id!.substring(40, 44), '无法获取id')
  return id!
}

export default getUserId
