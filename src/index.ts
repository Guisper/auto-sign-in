import { error, success, warn } from './utils/output'
import { loginUrl, idUrl, signInUrl, generalSignInUrl, pageUrl } from './utils/url'

import { checkUserinfo } from './services/userinfoUnit'
import login from './services/login'
import getUserId from './services/getUserId'
import submitRequest from './services/submitRequest'
import getPageResult from './services/getPageResult'
import createServer from './services/createServer'
import quit from './utils/quit'

const main = async () => {
  const [isAutoSignIn,isFirstExec, userinfo] = await checkUserinfo()
  await login(loginUrl, userinfo, isAutoSignIn)
  const id = await getUserId(idUrl)
  await submitRequest(isFirstExec, userinfo, id, signInUrl, generalSignInUrl)
  await getPageResult(pageUrl, id).catch(e => warn(e))
  !isAutoSignIn && await createServer().catch(e => warn(e))
}

main()
  .then(() => success('今日打卡成功'))
  .catch(e => {
    error('操作失败，错误信息：', e)
    quit()
  })
