import axios from 'axios'
import { stringify } from 'qs'

import { info, warn } from '../utils/output'
import checker from '../utils/checker'
import setHeaders from '../utils/setHeaders'
import { codeParser, responsParser } from '../utils/parser'
import { needRewriteUserinfo } from './userinfoUnit'

import HeaderModel from '../model/header.model'
import UserinfoModel from '../model/userinfo.model'

let cookie: string
const headers: HeaderModel = {
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36 Edg/103.0.1264.62',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}

const getCredit = async (url: string): Promise<string> => {
  // 获取 token 并加入到请求头中 以 cookie 的形式携带
  cookie && info('获取token...')
  const { headers: header, data } = await axios.get(url)
  const token = header?.['set-cookie']?.[0]!

  // 二次请求（用户重新修改了账号密码）时 ISP 不会再次返回 token 避免重新赋值和重复设置请求头
  if (token) {
    cookie = token
    headers.cookie = cookie
    setHeaders(headers)
  }
  checker(cookie, '获取成功', '无法获取token')

  // 获取页面上的验证码
  info('获取验证码...')
  const code = codeParser(data)
  checker(code, '获取成功：' + code, '无法获取code')
  return code!
}

const registerToken = async (url: string, userinfo: UserinfoModel, code: string): Promise<void> => {
  // 使用帐号密码和验证码登陆
  info('登陆以注册token...')
  const { username, userpwd } = userinfo
  const { data: page } = await axios.post(
    url,
    stringify({
      username,
      userpwd,
      code,
      login: 'login',
      checkcode: '1',
      rank: '0',
      action: 'login',
      m5: '1'
    })
  )

  // 验证登陆是否成功，出错询问是否重置账号密码
  // 这里仅验证登陆是否成功，若无法发送网络请求完成登陆操作，说明是网络的问题
  try {
    checker(page.includes('控制面板'), '注册成功', responsParser(page)!)
  } catch (e) {
    warn(e as string)
    const newUserinfo = await needRewriteUserinfo(userinfo, false)
    await login(url, newUserinfo)
  }
}

const login = async (url: string, userinfo: UserinfoModel): Promise<void> => {
  const code = await getCredit(url)
  await registerToken(url, userinfo, code)
}

export default login
