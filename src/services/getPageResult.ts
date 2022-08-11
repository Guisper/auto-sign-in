import axios from 'axios'
import { minify } from 'html-minifier'

import writer from '../utils/writer'
import { info, success } from '../utils/output'
import { staticPagePath } from '../utils/path'
import pageProcessor from '../utils/page'

const minifyOptions = {
  minifyJS: true,
  removeComments: true,
  collapseWhitespace: true,
  removeScriptTypeAttributes: true
}

const getPageResult = async (pageUrl: string, id: string): Promise<void> => {
  // 解析打卡的结果页面 并加工后写入本地文件
  info('尝试获取打卡页面信息...')
  const params = { id }
  const { data } = await axios.get(pageUrl, { params })
  success('获取成功')
  info('写入文件...')
  await writer(staticPagePath, minify(pageProcessor(data), minifyOptions))
}

export default getPageResult
