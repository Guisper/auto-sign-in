import axios from 'axios'
import { minify } from 'html-minifier'

import { checkDir, writer } from '../utils/io'
import { info, success, warn } from '../utils/output'
import { staticPagePath, staticPath } from '../utils/path'
import pageProcessor from '../utils/page'

const minifyOptions = {
  minifyJS: true,
  minifyCSS: true,
  removeComments: true,
  collapseWhitespace: true,
  removeScriptTypeAttributes: true
}

const getPageResult = async (pageUrl: string, id: string): Promise<void> => {
  // 解析打卡的结果页面 并加工后写入本地文件
  try {
    info('尝试获取打卡页面信息...')
    const params = { id }
    const { data } = await axios.get(pageUrl, { params })
    success('获取成功')
    info('写入文件...')
    await checkDir(staticPath)
    await writer(staticPagePath, minify(pageProcessor(data), minifyOptions))
  } catch (e) {
    warn(e as string)
  }
}

export default getPageResult
