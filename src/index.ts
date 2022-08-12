import { error } from './utils/output'
import { loginUrl, idUrl, signInUrl, generalSignInUrl, pageUrl } from './utils/url'

import { checkUserinfo } from './services/userinfoUnit'
import login from './services/login'
import getUserId from './services/getUserId'
import submitRequest from './services/submitRequest'
import getPageResult from './services/getPageResult'
import createServer from './services/createServer'

!(async () => {
  try {
    const [isAutoSignIn, isFirstExec, userinfo] = await checkUserinfo()
    await login(loginUrl, userinfo, isAutoSignIn)
    const id = await getUserId(idUrl)
    await submitRequest(isFirstExec, userinfo, id, signInUrl, generalSignInUrl)
    await getPageResult(pageUrl, id)
    if (!isAutoSignIn) {
      await createServer()
    }
    process.exit(0)
  } catch (e) {
    error('操作失败，错误信息：', e as string)
    process.exit(1)
  }
})()
