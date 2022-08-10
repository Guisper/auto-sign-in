import { cwd } from 'process'
import { resolve } from 'path'

// 需要用到的本地静态资源的路径
const staticPath: string = resolve(cwd(), './static')
const staticPagePath: string = resolve(cwd(), './static/index.html')
const userinfoPath: string = resolve(cwd(), './static/userinfo.json')

export { staticPath, staticPagePath, userinfoPath }
